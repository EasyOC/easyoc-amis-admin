export interface ContentType {
  ContentTypeDefinitionRecord: ContentTypeDefinitionRecord;
  ContentPartDefinitionRecord: ContentPartDefinitionRecord;
}

export interface ContentTypeDefinitionRecord {
  Name: string;
  DisplayName: string;
  Settings: Settings;
  ContentTypePartDefinitionRecords: ContentTypePartDefinitionRecord[];
}

export interface Settings {
  ContentTypeSettings: Partial<ContentTypeSettings>;
  FullTextAspectSettings: FullTextAspectSettings;
  GraphQLContentTypeSettings: GraphQlcontentTypeSettings;
}

export interface ContentTypeSettings {
  Stereotype?: string;
}

export interface FullTextAspectSettings {}

export interface GraphQlcontentTypeSettings {}

export interface ContentTypePartDefinitionRecord {
  PartName: string;
  Name: string;
  Settings: Settings2;
}

export interface Settings2 {
  ContentTypePartSettings: ContentTypePartSettings;
}

export interface ContentTypePartSettings {
  Position: string;
}

export interface ContentPartDefinitionRecord {
  Name: string;
  Settings: Settings3;
  ContentPartFieldDefinitionRecords: ContentPartFieldDefinitionRecord[];
}

export interface Settings3 {}
export enum FieldName {
  BooleanField = 'BooleanField',
  ContentPickerField = 'ContentPickerField',
  UserPickerField = 'UserPickerField',
  DateField = 'DateField',
  DateTimeField = 'DateTimeField',
  HtmlField = 'HtmlField',
  LinkField = 'LinkField',
  NumericField = 'NumericField',
  MediaField = 'MediaField',
  TextField = 'TextField',
  TimeField = 'TimeField',
  MultiTextField = 'MultiTextField',
}

export interface ContentPartFieldDefinitionRecord {
  FieldName: FieldName;
  Name: string;
  Settings: Settings4;
}

export interface Settings4 {
  ContentPartFieldSettings: ContentPartFieldSettings;
  ContentPickerFieldSettings: ContentPickerFieldSettings;
  LuceneContentIndexSettings: LuceneContentIndexSettings;
}

export interface ContentPartFieldSettings {
  DisplayName: string;
}

export interface ContentPickerFieldSettings {
  DisplayedContentTypes: string[];
  DisplayedStereotypes: any[];
}

export interface LuceneContentIndexSettings {}
