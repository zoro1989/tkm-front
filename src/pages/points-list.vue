<template>
  <section id="points-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @route-change="routeChange"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialog" title="知识点" cancelLabel="取消" confirmLabel="确定" :check="check">
      <tkm-form class="dialog-section" ref="tkmForm">
        <tkm-input class="section-title" label="标题" :content.sync="pointsTitle" placeholder="请输入知识点标题" :notEmpty="required"></tkm-input>
        <tkm-input class="section-order" label="排序" :content.sync="pointsOrder" placeholder="请输入排序" :notEmpty="required"></tkm-input>
        <tkm-select class="section-column" :content.sync="pointsParent" label="选择所属栏目" :notEmpty="notRequired">
          <mu-menu-item v-for="item in parents" :key="item.id + ''" :value="item.id + ''" :title="item.title"/>
        </tkm-select>
      </tkm-form>
      <section class="dialog-upload">
        <div class="image-list">
          <div v-for="item in uploadImages" >
            <a class="image-link" target="_blank" :href="item.cutUrl">{{item.cutUrl}}</a>
            <mu-float-button icon="delete" mini backgroundColor="red" @click="deleteImage(item)"/>
          </div>
        </div>
        <div class="image-buttom">
          <mu-raised-button label="添加图片" @click="addImage" backgroundColor="orange" />
        </div>
      </section>
      <rich-text ref="richText" :content.sync="pointsContent" ></rich-text>
    </tkm-dialog>
    <tkm-dialog ref="dialogDelete" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
    <input ref="imgFile" type="file" style="display: none;" @change="onImageChange"/>
  </section>
</template>

<script>
  import pointList from 'service/points-list'
  import TkmDialog from 'components/tkm-dialog'
  import TkmTable from 'components/tkm-table'
  import RichText from 'components/rich-text'
  import TkmInput from 'components/tkm-input'
  import TkmForm from 'components/tkm-form'
  import TkmSelect from 'components/tkm-select'
  export default{
    components: {
      TkmDialog,
      TkmTable,
      RichText,
      TkmInput,
      TkmForm,
      TkmSelect
    },
    data () {
      return {
        dialog: false,
        dialogMsg: '',
        tableData: [],
        pointsContent: '',
        pointsTitle: '',
        pointsOrder: '',
        pointsParent: '',
        pointId: '',
        check: true,
        required: true,
        notRequired: false,
        parents: [],
        uploadImages: [],
        type: this.$route.params.type ? this.$route.params.type : '',
        searchOperations: [
          {
            name: '查询',
            action: 'onSubmit',
            type: 'normal'
          },
          {
            name: '删除',
            action: 'deletePoints',
            type: 'delete'
          },
          {
            name: '添加',
            action: 'addPoints'
          }
        ],
        headers: [{name: '标题'}, {name: '排序'}]
      }
    },
    mounted () {
      this.pasteImage()
    },
    methods: {
      routeChange (params, to, success, fail) {
        this.type = to.params.type
        this.getListData(params, success, fail)
      },
      initData (params, success, fail) {
        this.getListData(params, success, fail)
      },
      getListData (params, success, fail) {
        pointList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo, type: this.type}, (data) => {
          this.tableData = data
        }, (err) => {
          fail(err)
        })
      },
      addImage () {
        this.$refs.imgFile.click()
      },
      deleteImage (item) {
        pointList.deleteImage.bind(this)(item, (data) => {
          let deleteIndex = this.uploadImages.findIndex((o) => {
            return item.id === o.id
          })
          if (deleteIndex >= 0) {
            this.uploadImages.splice(deleteIndex, 1)
          }
          this.$message({
            message: data.message,
            type: 'success'
          })
        }, (err) => {
          this.$message.error(err)
        })
      },
      onImageChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        let potentialFile = files[0]
        if (e.target.value) {
          e.target.value = ''
        }
        if (!(/(?:jpg|gif|png|bmp)$/i.test(potentialFile.name))) {
          this.$message.error('只允许上传jpg|gif|png|bmp格式的图片！')
          return
        }
        let size = potentialFile.size / (1024 * 1024)
        if (size > 10) {
          this.$message.error('上传图片大小不能超过10M')
          return
        }
        pointList.uploadImage.bind(this)({image: potentialFile, pointId: this.pointId}, (data) => {
          this.uploadImages.push(data)
          this.$message({
            message: '上传成功！',
            type: 'success'
          })
        }, (err) => {
          this.$message.error(err)
        })
//        let that = this
//        let url = window.URL.createObjectURL(potentialFile)
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'editPoint') {
          pointList.editPoint.bind(this)({row: row, type: this.type}, (data) => {
            this.pointsContent = data.detail
            this.pointsTitle = data.title
            this.pointsOrder = data.pOrder + ''
            this.pointsParent = data.parentId + ''
            this.pointId = data.id
            this.parents = data.parents
            this.uploadImages = data.cuts
            this.$refs.dialog.openDialog(() => {
//              row.detail = this.pointsContent
              row.detail = this.$refs.richText.getContentHTML().trim()
              row.title = this.pointsTitle
              row.pOrder = this.pointsOrder
              row.parentId = this.pointsParent
              pointList.save.bind(this)({row: row, type: this.type, validate: this.$refs.tkmForm}, (data) => {
                this.$refs.dialog.hide()
                success(data.message)
              }, (err) => {
                fail(err)
              })
            }, () => {
            })
          }, (err) => {
            fail(err)
          })
        } else if (action === 'deletePoint') {
          this.dialogMsg = '确认要删除这个知识点吗？'
          this.$refs.dialogDelete.openDialog(() => {
            pointList.deleteOne.bind(this)({row: row}, (data) => {
              success(data.data)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        } else {
          success()
        }
      },
      searchOperation (action, success, fail) {
        if (action === 'deletePoints') {
          this.dialogMsg = '确认要删除这些知识点吗？'
          this.$refs.dialogDelete.openDialog(() => {
            pointList.delete.bind(this)({tableData: this.tableData}, (data) => {
              success(data.data)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        } else if (action === 'addPoints') {
          pointList.getParentPoints.bind(this)({type: this.type}, (data) => {
            this.parents = data
            this.pointsContent = ''
            this.pointsTitle = ''
            this.pointsOrder = ''
            this.pointsParent = ''
            this.uploadImages = []
            this.$refs.dialog.openDialog(() => {
              let newRow = {}
//              newRow.detail = this.pointsContent
              newRow.detail = this.$refs.richText.getContentHTML().trim()
              newRow.title = this.pointsTitle
              newRow.pOrder = this.pointsOrder
              newRow.parentId = this.pointsParent
              pointList.save.bind(this)({row: newRow, type: this.type, validate: this.$refs.tkmForm}, (data) => {
                this.$refs.dialog.hide()
                success(data.message)
              }, (err) => {
                fail(err)
              })
            }, () => {
            })
          }, (err) => {
            fail(err)
          })
        } else {
          success()
        }
      },
      pasteImage () {
        let _this = this
        // 贴图
        document.addEventListener('paste', function (e) {
          if (e.clipboardData && e.clipboardData.types) {
            if (e.clipboardData.items.length > 0) {
              if (/^image\/\w+$/.test(e.clipboardData.items[0].type)) {
                var blob = e.clipboardData.items[0].getAsFile()
                pointList.uploadImage.bind(_this)({image: blob, pointId: _this.pointId}, (data) => {
                  _this.uploadImages.push(data)
                  _this.pointsContent += `@${data.cutUrl}@`
                }, (err) => {
                  _this.$message.error(err)
                })
              }
            }
          }
        })
      }
    }
  }

</script>

<style scoped>
  .mu-dialog {
    max-height: 80vh;
    overflow-y: auto;
  }
  .dialog-section {
    display: flex;
  }
  .dialog-upload .image-link {
    display: inline-block;
  }
  .dialog-upload .image-buttom {
    margin: 10px;
  }
</style>
