/**
 * Created by Administrator on 2017/12/13.
 */
export function validate (components) {
  let flg = true
  for (let i = 0; i < components.length; i++) {
    if (components[i].isNotEmpty && !components[i].isNotEmpty()) {
      flg = false
    }
  }
  return flg
}
