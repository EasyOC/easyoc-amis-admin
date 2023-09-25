import {
  ContentPartDefinitionRecord,
  ContentPartFieldDefinitionRecord,
  ContentType,
} from '@/types/src/OCRecipeTypes';
import { uuid } from 'amis-core';
import { unset } from 'lodash';

export type TempFiled = ContentPartFieldDefinitionRecord;

const addField = (typeDef: ContentType, field: TempFiled): ContentType => {
  //将新增的字段信息信息添加到集合的某个位置
  typeDef.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords.push({
    FieldName: field.FieldName,
    Name: field.Name,
    Settings: field.Settings,
  });
  return typeDef;
};

const updateField = (typeDef: ContentType, field: TempFiled, index: number): ContentType => {
  //将新增的字段信息信息添加到集合的某个位置
  if (!typeDef.ContentPartDefinitionRecord) {
    typeDef.ContentPartDefinitionRecord = {
      ContentPartFieldDefinitionRecords: [],
    } as unknown as ContentPartDefinitionRecord;
  }
  typeDef.ContentPartDefinitionRecord.ContentPartFieldDefinitionRecords[index] = {
    FieldName: field.FieldName,
    Name: field.Name,
    Settings: field.Settings,
  };
  return typeDef;
};

const removeField = (typeDef: ContentType, index: number): ContentType => {
  typeDef.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords.splice(index, 1);
  return typeDef;
};

const removeFields = (typeDef: ContentType, field: TempFiled[]): ContentType => {
  let indexArr: number[] = [];
  // 提取下标
  field.forEach((e) => {
    let temp = typeDef.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords.findIndex(
      (x) => x.Name == e.Name,
    ) as number;
    if (temp != -1) {
      indexArr.push(temp);
    }
  });
  // 下标按照降序排列
  indexArr.sort(function (a, b) {
    return b - a;
  });
  for (let i = indexArr.length - 1; i >= 0; i--) {
    typeDef.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords.splice(i, 1);
  }
  return typeDef;
};

export { addField, updateField, removeField, removeFields };
