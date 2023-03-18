export enum FieldType {
    TextField = 'TextField',
    BooleanField = 'BooleanField',
    DateField = 'DateField',
    TimeField = 'TimeField',
    DateTimeField = 'DateTimeField',
    NumericField = 'NumericField',
    ContentPickerField = 'ContentPickerField',
    UserPickerField = 'UserPickerField',
    HtmlField = 'HtmlField',
    MediaField = 'MediaField',
    TitlePart = 'TitlePart',
    CustomField = 'CustomField',
    GeoPointField = 'GeoPointField'
}


export class EditViewContentDefinitionDto {
    name!: string | null;
    displayName!: string | null;
    settings!: ContentTypeSettings;
    fullTextOption!: FullTextAspectSettings;
    fields!: ContentFieldsMappingDto[] | null;
}


export class FullTextAspectSettings {
    includeFullTextTemplate!: boolean;
    fullTextTemplate!: string | null;
    includeBodyAspect!: boolean;
    includeDisplayText!: boolean;
}

export class ContentTypeSettings {
    creatable!: boolean;
    listable!: boolean;
    draftable!: boolean;
    versionable!: boolean;
    stereotype!: string | null;
    securable!: boolean;
}


export class ContentFieldsMappingDto {
    keyPath!: string | null;
    /** 内容项的直接属性，默认False,比如 Published，Latest，DisplayText, */
    isSelf!: boolean;
    fieldName!: string | null;
    readonly fieldNameCamelCase!: string | null;
    displayName!: string | null;
    partDisplayName!: string | null;
    graphqlValuePath!: string | null;
    partName!: string | null;
    fieldSettings!: any | null;
    fieldType!: string | null;
    description!: string | null;
    lastValueKey!: string | null;
    isBasic!: boolean;
}