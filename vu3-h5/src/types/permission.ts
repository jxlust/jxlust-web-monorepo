import { BoolStatus, DoubleFlagStatus } from "@/enums";
type NumberOrString = string | number;

export interface PermissionForm {
  id?: NumberOrString;
  subjectId: number;
  permissionType: number | undefined;
  whiteBlackFlag?: DoubleFlagStatus;
  status: BoolStatus;
  name: string;
  intro: string;
}

export interface PermissionDetail extends Required<PermissionForm> {
  companyId: NumberOrString;
  createUser: string;
  updateTime: NumberOrString;
  createTime: NumberOrString;
}

export interface TagInfo {
  companyId: NumberOrString;
  tagName: string;
  tagCode: string;
  tagId: string;
}

type TagResponseKey = "tagList";
export type TagResponse = Record<TagResponseKey, TagInfo[]>;
export interface LabelRuleForm {
  id?: number;
  permissionId: number;
  rule: string;
  whiteBlackFlag: number;
}

export interface LabelRuleResponse {
  permissionComplexLabelDOList: Required<LabelRuleForm>[];
  total: number;
}

export type RuleDialogType = Pick<LabelRuleForm, "rule" | "whiteBlackFlag">;
