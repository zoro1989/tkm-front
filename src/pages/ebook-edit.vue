<template>
  <section id="ebook-edit">
    <input type="hidden" v-model="tip.id" />
    <mu-text-field label="tip编号" v-model="tip.tipsNo" labelFloat hintText="请输入编号" ></mu-text-field>
    <mu-text-field label="tip标题" v-model="tip.tipsTitle" labelFloat hintText="请输入标题"></mu-text-field>
    <mu-text-field label="tips使用功能/命令的标题" v-model="tip.funcTitle" labelFloat hintText="请输入函数标题"></mu-text-field>
    <mu-card>
      <mu-card-title subTitle="tips功能/命令的描述"/>
      <rich-text :content.sync="tip.funcDesc" ></rich-text>
    </mu-card>
    <mu-paper :zDepth="2" class="func-detail">
      <mu-float-button icon="add" mini backgroundColor="orange" @click="addFunc" />
      <span class="func-text">函数使用说明</span>
      <mu-paper :zDepth="3" class="fun" :key="item.tipsNo" v-for="(item, index) in tip.tipsFuncList">
        <input type="hidden" v-model="item.id" />
        <mu-float-button icon="delete" mini backgroundColor="red" @click="deleteFunc(index)" />
        <mu-text-field label="函数名" v-model="item.funcName" labelFloat hintText="请输入函数名"
                       multiLine :rows="3" :rowsMax="6"></mu-text-field>
        <mu-card>
          <mu-card-title subTitle="函数代码"/>
          <rich-text :content.sync="item.funcCode" ></rich-text>
        </mu-card>
      </mu-paper>
    </mu-paper>
    <mu-card>
      <mu-card-title subTitle="tips的示例代码"/>
      <rich-text :content.sync="tip.tipsCode" ></rich-text>
    </mu-card>
    <mu-card>
      <mu-card-title subTitle="tips的详解"/>
      <rich-text :content.sync="tip.tipsExplain" ></rich-text>
    </mu-card>
    <mu-text-field label="tips的详解表格" v-model="tip.explainTable" labelFloat hintText="请输入详解表格"
                   multiLine :rows="3" :rowsMax="6"></mu-text-field>
    <mu-text-field label="运行前图片路径" v-model="tip.imgBefore" labelFloat hintText="请输入运行前图片路径"></mu-text-field>
    <mu-text-field label="运行前图片描述" v-model="tip.imgBeforeDesc" labelFloat hintText="请输入运行前图片描述"></mu-text-field>
    <mu-text-field label="运行后图片路径" v-model="tip.imgAfter" labelFloat hintText="请输入运行后图片路径"></mu-text-field>
    <mu-text-field label="运行后图片路描述" v-model="tip.imgAfterDesc" labelFloat hintText="请输入运行后图片描述"></mu-text-field>
    <mu-text-field label="小提示标题" v-model="tip.noticeTitle" labelFloat hintText="请输入小提示标题"></mu-text-field>
    <mu-card>
      <mu-card-title subTitle="小提示内容"/>
      <rich-text :content.sync="tip.noticeContent" ></rich-text>
    </mu-card>
    <mu-card>
      <mu-card-title subTitle="小提示代码"/>
      <rich-text :content.sync="tip.noticeCode" ></rich-text>
    </mu-card>
    <section class="button-group">
      <mu-raised-button label="取消修改"  @click="onCancel" secondary/>
      <mu-raised-button label="确认修改"  @click="onSubmit" primary/>
    </section>
  </section>
</template>

<script>
  import ebookEdit from 'service/ebook-edit'
  import RichText from 'components/rich-text'
  export default{
    components: {
      RichText
    },
    created () {
      this.isInitialed = false
      this._initRichText()
      this._initData()
    },
    activated () {
      if (this.isInitialed) {
        this._initData()
      }
    },
    deactivated () {
      this.isInitialed = true
    },
    data () {
      return {
        isInitialed: false,
        tip: {},
        ebookcontent: ''
      }
    },
    methods: {
      deleteFunc (index) {
        this.tip.tipsFuncList.splice(index, 1)
      },
      addFunc () {
        if (!this.tip.tipsFuncList) {
          this.tip = Object.assign({}, this.tip, {tipsFuncList: []})
        }
        this.tip.tipsFuncList.push({})
      },
      _initRichText () {
      },
      _initData () {
        if (!this.$route.params.tipsNo || this.$route.params.tipsNo === '0') {
          return
        }
        ebookEdit.get.bind(this)({tipsNo: this.$route.params.tipsNo || ''}, (data) => {
          this.tip = data
        }, (err) => {
          this.$message.error(err)
        })
      },
      onCancel () {
        this.$router.replace({
          path: '/ebook-list'
        })
      },
      onSubmit () {
        ebookEdit.save.bind(this)({tip: this.tip}, (data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }, (err) => {
          this.$message.error(err)
        })
      }
    }
  }

</script>

<style scoped>
  #ebook-edit{
    width: 60%;
    margin: 20px auto;
  }
  #ebook-edit .func-detail {
    box-sizing: border-box;
  }
  #ebook-edit .func-detail .func-text{
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
    font-weight: 400;
    transform: translateZ(0) scale(.75);
  }
  #ebook-edit .func-detail .fun {
    margin: 10px;
  }
  #ebook-edit .mu-text-field {
    width: 100%;
    margin: 10px;
  }

</style>
