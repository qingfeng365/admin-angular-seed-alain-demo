
/**
 *
 * 排序类型定义
 *
 * @export
 * @interface SortDef
 */
export interface SortDef {
  // 排序标题
  title: string;
  // 排序属性名
  name?: string;
  // 允许选择升序/降序
  isCanSelectOrderMode?: boolean;
  // 是降序
  isDesc?: boolean;

}
