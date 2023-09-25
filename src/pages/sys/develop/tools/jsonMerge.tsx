import AMISComponent from '@/components/AMISComponent';
import { deepMerge } from '@/utils';
import React from 'react';

const oldDef = {
  ContentTypeDefinitionRecords: [
    {
      Name: 'RDBMSMappingConfig',
      DisplayName: 'RDBMS Mapping Config',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'RDBMSMappingConfig',
          Name: 'RDBMSMappingConfig',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
      ],
    },
    {
      Name: 'DbConnectionConfig',
      DisplayName: '外部数据源',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'DbConnectionConfig',
          Name: 'DbConnectionConfig',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
      ],
    },
    {
      Name: 'HtmlDashboardWidget',
      DisplayName: 'Html Dashboard Widget',
      Settings: {
        ContentTypeSettings: {
          Draftable: true,
          Versionable: true,
          Stereotype: 'DashboardWidget',
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'HtmlDashboardWidget',
          Name: 'HtmlDashboardWidget',
          Settings: {
            ContentTypePartSettings: {
              Position: '3',
            },
          },
        },
        {
          PartName: 'DashboardPart',
          Name: 'DashboardPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '2',
            },
          },
        },
        {
          PartName: 'HtmlBodyPart',
          Name: 'HtmlBodyPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
              Editor: 'Wysiwyg',
            },
            GraphQLContentTypePartSettings: {},
            HtmlBodyPartSettings: {},
          },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
      ],
    },
    {
      Name: 'Form',
      DisplayName: 'Form',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'Widget',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            TitlePartSettings: {
              RenderTitle: false,
            },
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
        {
          PartName: 'FormElementPart',
          Name: 'FormElementPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'FormPart',
          Name: 'FormPart',
          Settings: {},
        },
        {
          PartName: 'FlowPart',
          Name: 'FlowPart',
          Settings: {},
        },
      ],
    },
    {
      Name: 'Label',
      DisplayName: 'Label',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'Widget',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            TitlePartSettings: {
              RenderTitle: false,
            },
          },
        },
        {
          PartName: 'FormElementPart',
          Name: 'FormElementPart',
          Settings: {},
        },
        {
          PartName: 'LabelPart',
          Name: 'LabelPart',
          Settings: {},
        },
      ],
    },
    {
      Name: 'Input',
      DisplayName: 'Input',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'Widget',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'FormInputElementPart',
          Name: 'FormInputElementPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'FormElementPart',
          Name: 'FormElementPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '2',
            },
          },
        },
        {
          PartName: 'InputPart',
          Name: 'InputPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '4',
            },
          },
        },
        {
          PartName: 'FormElementLabelPart',
          Name: 'FormElementLabelPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '3',
            },
          },
        },
        {
          PartName: 'FormElementValidationPart',
          Name: 'FormElementValidationPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '5',
            },
          },
        },
      ],
    },
    {
      Name: 'TextArea',
      DisplayName: 'Text Area',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'Widget',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'FormInputElementPart',
          Name: 'FormInputElementPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'FormElementPart',
          Name: 'FormElementPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '2',
            },
          },
        },
        {
          PartName: 'TextAreaPart',
          Name: 'TextAreaPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '4',
            },
          },
        },
        {
          PartName: 'FormElementLabelPart',
          Name: 'FormElementLabelPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '3',
            },
          },
        },
        {
          PartName: 'FormElementValidationPart',
          Name: 'FormElementValidationPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '5',
            },
          },
        },
      ],
    },
    {
      Name: 'Select',
      DisplayName: 'Select',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'Widget',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'FormInputElementPart',
          Name: 'FormInputElementPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'FormElementPart',
          Name: 'FormElementPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '2',
            },
          },
        },
        {
          PartName: 'SelectPart',
          Name: 'SelectPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '4',
            },
          },
        },
        {
          PartName: 'FormElementLabelPart',
          Name: 'FormElementLabelPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '3',
            },
          },
        },
        {
          PartName: 'FormElementValidationPart',
          Name: 'FormElementValidationPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '5',
            },
          },
        },
      ],
    },
    {
      Name: 'Button',
      DisplayName: 'Button',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'Widget',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'FormInputElementPart',
          Name: 'FormInputElementPart',
          Settings: {},
        },
        {
          PartName: 'FormElementPart',
          Name: 'FormElementPart',
          Settings: {},
        },
        {
          PartName: 'ButtonPart',
          Name: 'ButtonPart',
          Settings: {},
        },
      ],
    },
    {
      Name: 'ValidationSummary',
      DisplayName: 'Validation Summary',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'Widget',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'ValidationSummaryPart',
          Name: 'ValidationSummaryPart',
          Settings: {},
        },
      ],
    },
    {
      Name: 'Validation',
      DisplayName: 'Validation',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'Widget',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'ValidationPart',
          Name: 'ValidationPart',
          Settings: {},
        },
      ],
    },
    {
      Name: 'Menu',
      DisplayName: 'Menu',
      Settings: {
        ContentTypeSettings: {
          Listable: true,
          Draftable: true,
          Versionable: true,
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
        {
          PartName: 'AliasPart',
          Name: 'AliasPart',
          Settings: {
            AliasPartSettings: {
              Pattern: '{{ ContentItem | display_text | slugify }}',
            },
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'MenuPart',
          Name: 'MenuPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '2',
            },
          },
        },
        {
          PartName: 'MenuItemsListPart',
          Name: 'MenuItemsListPart',
          Settings: {},
        },
      ],
    },
    {
      Name: 'LinkMenuItem',
      DisplayName: 'Link Menu Item',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'MenuItem',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'LinkMenuItemPart',
          Name: 'LinkMenuItemPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
        {
          PartName: 'LinkMenuItem',
          Name: 'LinkMenuItem',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
      ],
    },
    {
      Name: 'ContentMenuItem',
      DisplayName: 'Content Menu Item',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'MenuItem',
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'ContentMenuItemPart',
          Name: 'ContentMenuItemPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
        {
          PartName: 'ContentMenuItem',
          Name: 'ContentMenuItem',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
      ],
    },
    {
      Name: 'HtmlMenuItem',
      DisplayName: 'Html Menu Item',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'MenuItem',
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'HtmlMenuItemPart',
          Name: 'HtmlMenuItemPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
        {
          PartName: 'HtmlMenuItem',
          Name: 'HtmlMenuItem',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
      ],
    },
    {
      Name: 'Taxonomy',
      DisplayName: 'Taxonomy',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'AliasPart',
          Name: 'AliasPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '2',
            },
            AliasPartSettings: {
              Pattern: '{{ Model.ContentItem | display_text | slugify }}',
            },
          },
        },
        {
          PartName: 'AutoroutePart',
          Name: 'AutoroutePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '3',
            },
            AutoroutePartSettings: {
              Pattern: '{{ Model.ContentItem | display_text | slugify }}',
              AllowRouteContainedItems: true,
            },
          },
        },
        {
          PartName: 'TaxonomyPart',
          Name: 'TaxonomyPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '4',
            },
          },
        },
      ],
    },
    {
      Name: 'AmisPage',
      DisplayName: 'Amis Page',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'AmisPage',
          Name: 'AmisPage',
          Settings: {
            ContentTypePartSettings: {
              Position: '3',
            },
          },
        },
        {
          PartName: 'AliasPart',
          Name: 'AliasPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'AutoroutePart',
          Name: 'AutoroutePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '2',
            },
          },
        },
        {
          PartName: 'HtmlBodyPart',
          Name: 'HtmlBodyPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '4',
            },
          },
        },
        {
          PartName: 'PreviewPart',
          Name: 'PreviewPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '5',
            },
          },
        },
        {
          PartName: 'PublishLaterPart',
          Name: 'PublishLaterPart',
          Settings: {
            ContentTypePartSettings: {
              Position: '6',
            },
          },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
      ],
    },
    {
      Name: 'UserProfile',
      DisplayName: 'User Profiles',
      Settings: {
        ContentTypeSettings: {
          Listable: true,
          Draftable: true,
          Securable: true,
          Versionable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'UserProfilePart',
          Name: 'UserProfilePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
            GraphQLContentTypePartSettings: {},
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          PartName: 'UserProfile',
          Name: 'UserProfile',
          Settings: {
            ContentTypePartSettings: {
              Position: '2',
            },
          },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
              DisplayName: 'Title',
              Description: 'Provides a Title for your content item.',
            },
            GraphQLContentTypePartSettings: {},
            TitlePartSettings: {
              Options: 1,
              Pattern:
                '{{ContentItem.Content.UserProfile.UserName.Text}} - {{ContentItem.Content.UserProfilePart.RealName.Text}} 【{{ContentItem.Content.UserProfilePart.NickName.Text}}】',
            },
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
      ],
    },
    {
      Name: 'Department',
      DisplayName: '部门',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'Department',
          Name: 'Department',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
      ],
    },
    {
      Name: 'UserProfileInternal',
      DisplayName: 'User Profile Internal',
      Settings: {
        ContentTypeSettings: {
          Stereotype: 'CustomUserSettings',
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'UserProfileInternal',
          Name: 'UserProfileInternal',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
        {
          PartName: 'UserProfilePart',
          Name: 'UserProfilePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
      ],
    },
    {
      Name: 'AmisSchema',
      DisplayName: 'Amis Schema',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'AmisSchema',
          Name: 'AmisSchema',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              Position: '0',
            },
          },
        },
      ],
    },
    {
      Name: 'DynamicIndexConfigSetting',
      DisplayName: 'DynamicIndex Config',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'DynamicIndexConfigSetting',
          Name: 'DynamicIndexConfigSetting',
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
      ],
    },
  ],
  ContentPartDefinitionRecords: [
    {
      Name: 'LiquidPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a Liquid formatted body for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'CommonPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides an editor for the common properties of a content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'AuditTrailPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description:
            'Allows editors to enter a comment to be saved into the Audit Trail event when saving a content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'PreviewPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description:
            'Provides a way to define the url that is used to render your content item for preview. You only need to use this for the content preview feature when running the frontend decoupled from the admin.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'ImportExcelSettings',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'SheetName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'SheetName',
              Position: '0',
            },
          },
        },
        {
          FieldName: 'NumericField',
          Name: 'StartRowNumber',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Start Row Number',
              Position: '1',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'StartColumnName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Start Column Name',
              Position: '2',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'EndColumnName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'End Column Name',
              Position: '3',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'TargetContentType',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'TargetContentType',
              Position: '4',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'FieldsMappingConfig',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'FieldsMappingConfig',
              Editor: 'Monaco',
              Position: '5',
            },
            TextFieldSettings: {
              Hint: 'Javascript',
              Required: true,
            },
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "javascript"\r\n}',
            },
          },
        },
      ],
    },
    {
      Name: 'RDBMSMappingConfig',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'TargetTable',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Target Table',
              Position: '0',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'ContentTypeName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'ContentTypeName',
              Position: '1',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'MappingData',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'MappingData',
              Editor: 'CodeMirror',
              Position: '2',
            },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'EnableAutoSync',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Enable Auto Sync',
              Editor: 'Switch',
              Position: '4',
            },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'ReadOnly',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Read Only',
              Editor: 'Switch',
              Position: '5',
            },
          },
        },
      ],
    },
    {
      Name: 'DbConnectionConfig',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'DatabaseProvider',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Database Provider',
              Editor: 'PredefinedList',
              Position: '0',
            },
            TextFieldPredefinedListEditorSettings: {
              Options: [
                {
                  name: 'MySql',
                  value: 'MySql',
                },
                {
                  name: 'SqlServer',
                  value: 'SqlServer',
                },
                {
                  name: 'PostgreSQL',
                  value: 'PostgreSQL',
                },
                {
                  name: 'Oracle',
                  value: 'Oracle',
                },
                {
                  name: 'Sqlite',
                  value: 'Sqlite',
                },
                {
                  name: 'OdbcOracle',
                  value: 'OdbcOracle',
                },
                {
                  name: 'OdbcSqlServer',
                  value: 'OdbcSqlServer',
                },
                {
                  name: 'OdbcMySql',
                  value: 'OdbcMySql',
                },
                {
                  name: 'OdbcPostgreSQL',
                  value: 'OdbcPostgreSQL',
                },
                {
                  name: 'Odbc',
                  value: 'Odbc',
                },
                {
                  name: 'OdbcDameng',
                  value: 'OdbcDameng',
                },
                {
                  name: 'MsAccess',
                  value: 'MsAccess',
                },
                {
                  name: 'Dameng',
                  value: 'Dameng',
                },
                {
                  name: 'OdbcKingbaseES',
                  value: 'OdbcKingbaseES',
                },
                {
                  name: 'ShenTong',
                  value: 'ShenTong',
                },
                {
                  name: 'KingbaseES',
                  value: 'KingbaseES',
                },
                {
                  name: 'Firebird',
                  value: 'Firebird',
                },
                {
                  name: 'Custom',
                  value: 'Custom',
                },
                {
                  name: 'ClickHouse',
                  value: 'ClickHouse',
                },
                {
                  name: 'GBase',
                  value: 'GBase',
                },
                {
                  name: 'CustomOracle',
                  value: 'CustomOracle',
                },
                {
                  name: 'CustomSqlServer',
                  value: 'CustomSqlServer',
                },
                {
                  name: 'CustomMySql',
                  value: 'CustomMySql',
                },
                {
                  name: 'CustomPostgreSQL',
                  value: 'CustomPostgreSQL',
                },
              ],
              Editor: 1,
              DefaultValue: 'Sqlite',
            },
            TextFieldSettings: {
              Hint: 'FreeSql支持的所有数据库，已添加 MySql, Sqlite, SqlServer.\r\n                                    其它数据库请手动添加包引用到项目中',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'ConnectionString',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'ConnectionString',
              Editor: 'TextArea',
              Position: '4',
            },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'UseIntergrationAuth',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '使用集成身份认证',
              Position: '1',
            },
            BooleanFieldSettings: {},
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'UserName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'UserName',
              Position: '2',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Password',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Password',
              Position: '3',
            },
          },
        },
      ],
    },
    {
      Name: 'DashboardPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a way to add widgets to a dashboard.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'AliasPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a way to define custom aliases for content items.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'ArchiveLaterPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description:
            'Adds the ability to schedule content items to be archived at a given future date and time.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'AutoroutePart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a custom url for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'LocalizationPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a way to create localized version of content.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'WidgetsListPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a way to add widgets to Layout zones for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'FlowPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description:
            'Provides a customizable body for your content item where you can build a content structure with widgets.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'BagPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Reusable: true,
          Description:
            'Provides a collection behavior for your content item where you can place other content items.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'FormPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Turns your content item into a form.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'FormElementPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Provides attributes common to all form elements.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'FormInputElementPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Provides attributes common to all input form elements.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'LabelPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Provides label properties.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'InputPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Provides input field properties.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'TextAreaPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Provides text area properties.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'SelectPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Provides select field properties.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'ButtonPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Provides button properties.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'ValidationSummaryPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Displays a validation summary.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'ValidationPart',
      Settings: {
        ContentPartSettings: {
          Description: 'Displays a field validation error.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'FormElementLabelPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          DisplayName: 'Form Element Label Part',
          Description: "Provides a way to capture element's label.",
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'FormElementValidationPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          DisplayName: 'Form Element Validation Part',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'HtmlBodyPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides an HTML Body for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'ListPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Add a list behavior.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'MarkdownBodyPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a Markdown formatted body for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'TitlePart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a Title for your content item.',
          DefaultPosition: '0',
          Reusable: true,
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'MenuPart',
      Settings: {},
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'MenuItemPart',
      Settings: {},
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'LinkMenuItemPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a menu link behavior for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'ContentMenuItemPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          DisplayName: 'Content Menu Item',
          Description:
            'Provides a menu link behavior with the Content Picker for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'ContentPickerField',
          Name: 'SelectedContentItem',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Selected Content Item',
              Position: '0',
            },
            ContentPickerFieldSettings: {
              Required: true,
              DisplayAllContentTypes: true,
              DisplayedContentTypes: [],
            },
          },
        },
      ],
    },
    {
      Name: 'HtmlMenuItemPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          DisplayName: 'Html Menu Item',
          Description:
            'Provides a menu link behavior with a field to display html for the link text.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'PublishLaterPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description:
            'Adds the ability to schedule content items to be published at a given future date and time.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'HtmlDashboardWidget',
      Settings: {},
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'MenuItemsListPart',
      Settings: {},
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'LinkMenuItem',
      Settings: {},
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'ContentMenuItem',
      Settings: {},
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'HtmlMenuItem',
      Settings: {},
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'AmisPage',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'JsonSchema',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'JsonSchema',
              Editor: 'Monaco',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "javascript"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
      ],
    },
    {
      Name: 'UserProfile',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'UserPickerField',
          Name: 'OwnerUser',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'OwnerUser',
              Position: '0',
            },
            UserPickerFieldSettings: {
              Required: true,
              DisplayAllUsers: true,
              DisplayedRoles: [],
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'UserName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'UserName',
              Position: '1',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Email',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Email',
              Position: '2',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'UserId',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'UserId',
              Position: '3',
            },
          },
        },
      ],
    },
    {
      Name: 'UserProfilePart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
        },
      },
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'NickName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Nick Name',
              Position: '0',
            },
            TextFieldSettings: {},
            LuceneContentIndexSettings: {
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'FirstName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'First Name',
              Position: '6',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'LastName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Last Name',
              Position: '7',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Gender',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Gender',
              Editor: 'PredefinedList',
              Position: '5',
            },
            TextFieldSettings: {},
            TextFieldPredefinedListEditorSettings: {
              Options: [
                {
                  name: 'Male',
                  value: 'Male',
                },
                {
                  name: 'Female',
                  value: 'Female',
                },
                {
                  name: 'Unknown',
                  value: '',
                },
              ],
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'JobTitle',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Job Title',
              Position: '2',
            },
            TextFieldSettings: {},
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          FieldName: 'ContentPickerField',
          Name: 'Department',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '部门',
              Position: '4',
            },
            ContentPickerFieldSettings: {
              DisplayedContentTypes: ['Department'],
            },
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          FieldName: 'UserPickerField',
          Name: 'Manager',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '直属上级',
              Position: '1',
            },
            UserPickerFieldSettings: {
              DisplayedRoles: ['Employee', 'User'],
            },
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'EmployeCode',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '员工号',
              Position: '3',
            },
            TextFieldSettings: {},
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'RealName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '真实姓名',
              Position: '0',
            },
          },
        },
        {
          FieldName: 'MediaField',
          Name: 'Avatar',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '用户头像',
              Editor: 'Attached',
              Position: '2',
            },
            MediaFieldSettings: {
              Multiple: false,
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Name',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '登录名',
              Position: '4',
            },
            TextFieldSettings: {},
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
      ],
    },
    {
      Name: 'Department',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'ContentPickerField',
          Name: 'ParentDepartmentId',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '上级部门',
              Position: '0',
            },
            ContentPickerFieldSettings: {
              DisplayedContentTypes: ['Department'],
            },
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          FieldName: 'NumericField',
          Name: 'OrderIndex',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '排序',
              Position: '1',
            },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'Status',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '启用状态',
              Editor: 'Switch',
              Position: '2',
            },
            BooleanFieldSettings: {
              DefaultValue: true,
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Description',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '备注',
              Editor: 'TextArea',
              Position: '3',
            },
            TextFieldSettings: {},
            LuceneContentIndexSettings: {},
          },
        },
      ],
    },
    {
      Name: 'VbenList',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'TargetContentType',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '目标类型',
              Position: '0',
            },
            TextFieldSettings: {},
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'ListMapping',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '列映射',
              Editor: 'Monaco',
              Position: '2',
            },
            TextFieldSettings: {
              Required: true,
            },
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'QueryMethod',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '查询方式',
              Editor: 'PredefinedList',
              Position: '1',
            },
            TextFieldSettings: {},
            TextFieldPredefinedListEditorSettings: {
              Options: [
                {
                  name: 'Graphql',
                  value: 'Graphql',
                },
                {
                  name: 'CustomApi',
                  value: 'CustomApi',
                },
                {
                  name: 'ContentItemApi',
                  value: 'ContentItemApi',
                },
                {
                  name: 'LucenCustomQuery',
                  value: 'LucenCustomQuery',
                },
                {
                  name: 'SQLCustomQuery',
                  value: 'SQLCustomQuery',
                },
              ],
              Editor: 1,
              DefaultValue: 'Graphql',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'FieldList',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '字段列表',
              Editor: 'Monaco',
              Position: '1',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'GraphQL',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'GraphQL',
              Editor: 'Monaco',
              Position: '2',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "grapqhl"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'EnablePage',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '包含分页',
              Editor: 'Switch',
              Position: '3',
            },
            BooleanFieldSettings: {
              DefaultValue: true,
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'QueryName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '查询名称',
              Position: '4',
            },
          },
        },
      ],
    },
    {
      Name: 'AmisSchema',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'Schema',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Schema',
              Editor: 'Monaco',
              Position: '0',
            },
            TextFieldSettings: {
              Required: true,
            },
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Description',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Description',
              Position: '4',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Name',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Name',
              Position: '3',
            },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'hasUrlParams',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'hasUrlParams',
              Position: '2',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'TargetTypeName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'TargetTypeName',
              Position: '1',
            },
          },
        },
      ],
    },
    {
      Name: 'DynamicIndexConfigSetting',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'TypeName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'TypeName',
              Position: '0',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'TableName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'TableName',
              Position: '1',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'ConfigData',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'ConfigData',
              Editor: 'Monaco',
              Position: '3',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'EntityInfo',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'EntityInfo',
              Editor: 'Monaco',
              Position: '2',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
      ],
    },
    {
      Name: 'VbenMenu',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'MenuName',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '菜单名称',
              Position: '0',
            },
          },
        },
        {
          FieldName: 'ContentPickerField',
          Name: 'ParentMenu',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '上级菜单',
              Position: '6',
            },
            ContentPickerFieldSettings: {
              DisplayedContentTypes: ['VbenMenu'],
            },
            LuceneContentIndexSettings: {
              Included: true,
              Stored: true,
              Analyzed: true,
            },
          },
        },
        {
          FieldName: 'NumericField',
          Name: 'OrderNo',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '排序',
              Position: '7',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Icon',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '图标',
              Position: '8',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'RoutePath',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '路由地址',
              Position: '9',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Component',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '组件路径',
              Position: '10',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Permission',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '权限标识',
              Position: '11',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Status',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '状态',
              Position: '12',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'IsExt',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '是否外链',
              Position: '13',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Show',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '是否显示',
              Position: '15',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'MenuType',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '菜单类型',
              Position: '5',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Meta',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Meta',
              Editor: 'Monaco',
              Position: '2',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'NumericField',
          Name: 'ComponentType',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'ComponentType',
              Position: '3',
            },
            NumericFieldSettings: {
              Hint: '组件 /  Layout / 动态页',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'SchemaId',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'SchemaId',
              Position: '4',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'redirect',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'redirect',
              Position: '1',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'KeepAlive',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'KeepAlive',
            },
          },
        },
      ],
    },
  ],
  Identifier: '4nb5v1g57f8k3zrn7vaccak64y',
};

const currentDef = {
  ContentTypeDefinitionRecords: [
    {
      Name: 'UserProfile',
      DisplayName: 'User Profiles',
      Settings: {
        ContentTypeSettings: {
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
        HandlerScripts: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'UserProfilePart',
          Name: 'UserProfilePart',
          Settings: {
            ContentTypePartSettings: { Position: '0' },
            GraphQLContentTypePartSettings: {},
            LuceneContentIndexSettings: { Included: true, Stored: true, Analyzed: true },
          },
        },
        {
          PartName: 'UserProfile',
          Name: 'UserProfile',
          Settings: { ContentTypePartSettings: { Position: '2' } },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              DisplayName: 'Title',
              Description: 'Provides a Title for your content item.',
              Position: '1',
            },
            GraphQLContentTypePartSettings: {},
            TitlePartSettings: {
              Options: 1,
              Pattern:
                '{{ContentItem.Content.UserProfilePart.FirstName.Text}}, {{ContentItem.Content.UserProfilePart.LastName.Text}} - {{ContentItem.Content.UserProfile.UserName.Text}}',
            },
            LuceneContentIndexSettings: { Included: true, Stored: true },
          },
        },
      ],
    },
    {
      Name: 'Department',
      DisplayName: '部门',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
        HandlerScripts: {
          CreateHandlerScript: '111111111',
          UpdateHandlerScript: '2222222222222',
          DeleteHandlerScript: '3333333333333333',
          PublishHandlerScript: '4444444444444',
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'Department',
          Name: 'Department',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'UserProfileInternal',
      DisplayName: 'User Profile Internal',
      Settings: {
        ContentTypeSettings: { Stereotype: 'CustomUserSettings' },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'UserProfileInternal',
          Name: 'UserProfileInternal',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
        {
          PartName: 'UserProfilePart',
          Name: 'UserProfilePart',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
      ],
    },
    {
      Name: 'AmisSchema',
      DisplayName: 'Amis Schema',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'AmisSchema',
          Name: 'AmisSchema',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'DynamicIndexConfigSetting',
      DisplayName: 'DynamicIndex Config',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'DynamicIndexConfigSetting',
          Name: 'DynamicIndexConfigSetting',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
      ],
    },
    {
      Name: 'DbConnectionConfig',
      DisplayName: '外部数据源',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'DbConnectionConfig',
          Name: 'DbConnectionConfig',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'AntdMenuItem',
      DisplayName: 'Antd 路由菜单项',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
        HandlerScripts: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'AntdMenuItem',
          Name: 'AntdMenuItem',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: {
            ContentTypePartSettings: {
              DisplayName: 'Title',
              Description: 'Provides a Title for your content item.',
              Position: '2',
            },
            GraphQLContentTypePartSettings: {},
            TitlePartSettings: { Pattern: '{{ContentItem.Content.AntdMenuItem.Name.Text}}' },
            LuceneContentIndexSettings: {},
          },
        },
        {
          PartName: 'ContentPermissionsPart',
          Name: 'ContentPermissionsPart',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'AntdSiteGlobalSettings',
      DisplayName: 'Antd 站点设置',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Stereotype: 'CustomSettings',
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'AntdSiteGlobalSettings',
          Name: 'AntdSiteGlobalSettings',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'RDBMSMappingConfig',
      DisplayName: 'RDBMS Mapping Config',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'RDBMSMappingConfig',
          Name: 'RDBMSMappingConfig',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'ClientAppConfiguration',
      DisplayName: 'ClientAppConfiguration',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'ClientAppConfiguration',
          Name: 'ClientAppConfiguration',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'AppPermissionItem',
      DisplayName: 'AppPermissionItem',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'AppPermissionItem',
          Name: 'AppPermissionItem',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'LiquidPage',
      DisplayName: 'LiquidPage',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'LiquidPage',
          Name: 'LiquidPage',
          Settings: { ContentTypePartSettings: { Position: '1' } },
        },
        {
          PartName: 'AutoroutePart',
          Name: 'AutoroutePart',
          Settings: {
            ContentTypePartSettings: { Position: '2' },
            GraphQLContentTypePartSettings: {},
            AutoroutePartSettings: {
              AllowCustomPath: true,
              ShowHomepageOption: true,
              AllowUpdatePath: true,
              AllowDisabled: true,
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          PartName: 'LiquidPart',
          Name: 'LiquidPart',
          Settings: { ContentTypePartSettings: { Position: '3' } },
        },
        {
          PartName: 'TitlePart',
          Name: 'TitlePart',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
    {
      Name: 'SalesPortalConfiguration',
      DisplayName: 'SalesPortalConfiguration',
      Settings: {
        ContentTypeSettings: {
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Stereotype: 'CustomSettings',
          Securable: true,
        },
        FullTextAspectSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: 'SalesPortalConfiguration',
          Name: 'SalesPortalConfiguration',
          Settings: { ContentTypePartSettings: { Position: '0' } },
        },
      ],
    },
  ],
  ContentPartDefinitionRecords: [
    {
      Name: 'LiquidPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a Liquid formatted body for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'AuditTrailPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description:
            'Allows editors to enter a comment to be saved into the Audit Trail event when saving a content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'AutoroutePart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a custom url for your content item.',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'TitlePart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          Description: 'Provides a Title for your content item.',
          DefaultPosition: '0',
          Reusable: true,
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'UserProfile',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'UserPickerField',
          Name: 'OwnerUser',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'OwnerUser', Position: '0' },
            UserPickerFieldSettings: { Required: true, DisplayAllUsers: true, DisplayedRoles: [] },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'UserName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'UserName', Position: '1' } },
        },
        {
          FieldName: 'TextField',
          Name: 'Email',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Email', Position: '2' } },
        },
        {
          FieldName: 'TextField',
          Name: 'UserId',
          Settings: { ContentPartFieldSettings: { DisplayName: 'UserId', Position: '3' } },
        },
      ],
    },
    {
      Name: 'UserProfilePart',
      Settings: { ContentPartSettings: { Attachable: true } },
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'FirstName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'First Name', Position: '6' } },
        },
        {
          FieldName: 'TextField',
          Name: 'LastName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Last Name', Position: '7' } },
        },
        {
          FieldName: 'TextField',
          Name: 'Gender',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Gender',
              Editor: 'PredefinedList',
              Position: '5',
            },
            TextFieldSettings: {},
            TextFieldPredefinedListEditorSettings: {
              Options: [
                { name: 'Male', value: 'Male' },
                { name: 'Female', value: 'Female' },
                { name: 'Unknown', value: '' },
              ],
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'JobTitle',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'Job Title', Position: '2' },
            TextFieldSettings: {},
            LuceneContentIndexSettings: { Included: true, Stored: true, Analyzed: true },
          },
        },
        {
          FieldName: 'ContentPickerField',
          Name: 'Department',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '部门', Position: '4' },
            ContentPickerFieldSettings: { DisplayedContentTypes: ['Department'] },
            LuceneContentIndexSettings: { Included: true, Stored: true, Analyzed: true },
          },
        },
        {
          FieldName: 'UserPickerField',
          Name: 'Manager',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '直属上级', Position: '1' },
            UserPickerFieldSettings: { DisplayedRoles: ['Employee', 'User'] },
            LuceneContentIndexSettings: { Included: true, Stored: true, Analyzed: true },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'EmployeCode',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '员工号', Position: '3' },
            TextFieldSettings: {},
            LuceneContentIndexSettings: { Included: true, Stored: true, Analyzed: true },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'RealName',
          Settings: { ContentPartFieldSettings: { DisplayName: '真实姓名', Position: '0' } },
        },
        {
          FieldName: 'MediaField',
          Name: 'Avatar',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '用户头像',
              Editor: 'Attached',
              Position: '2',
            },
            MediaFieldSettings: { Multiple: false },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Name',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '登录名', Position: '4' },
            TextFieldSettings: {},
            LuceneContentIndexSettings: { Included: true, Stored: true, Analyzed: true },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'DisplayName',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '显示名', Position: '1' },
            TextFieldSettings: {},
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'NickName',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'Nick Name', Position: '0' },
            TextFieldSettings: {},
            LuceneContentIndexSettings: { Stored: true, Analyzed: true },
          },
        },
      ],
    },
    {
      Name: 'Department',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'ContentPickerField',
          Name: 'ParentDepartmentId',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '上级部门', Position: '0' },
            ContentPickerFieldSettings: { DisplayedContentTypes: ['Department'] },
            LuceneContentIndexSettings: { Included: true, Stored: true, Analyzed: true },
          },
        },
        {
          FieldName: 'NumericField',
          Name: 'OrderIndex',
          Settings: { ContentPartFieldSettings: { DisplayName: '排序', Position: '1' } },
        },
        {
          FieldName: 'BooleanField',
          Name: 'Status',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '启用状态', Editor: 'Switch', Position: '2' },
            BooleanFieldSettings: { DefaultValue: true },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Description',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '备注', Editor: 'TextArea', Position: '3' },
            TextFieldSettings: {},
            LuceneContentIndexSettings: {},
          },
        },
      ],
    },
    {
      Name: 'AmisSchema',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'Schema',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'Schema', Editor: 'Monaco', Position: '0' },
            TextFieldSettings: { Required: true },
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: { Stored: true, Included: true, Analyzed: true },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Description',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Description', Position: '8' } },
        },
        {
          FieldName: 'TextField',
          Name: 'Name',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'Name', Position: '7' },
            TextFieldSettings: { Required: true },
            LuceneContentIndexSettings: { Included: true, Stored: true },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'hasUrlParams',
          Settings: { ContentPartFieldSettings: { DisplayName: 'hasUrlParams', Position: '5' } },
        },
        {
          FieldName: 'TextField',
          Name: 'TargetTypeName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'TargetTypeName', Position: '3' } },
        },
        {
          FieldName: 'TextField',
          Name: 'LayoutName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'LayoutName', Position: '4' } },
        },
        {
          FieldName: 'BooleanField',
          Name: 'UseLayout',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'UseLayout', Position: '6' },
            BooleanFieldSettings: {},
            LuceneContentIndexSettings: { Included: true, Stored: true, Keyword: true },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'ModuleName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'ModuleName', Position: '1' } },
        },
        {
          FieldName: 'BooleanField',
          Name: 'Reuseable',
          Settings: { ContentPartFieldSettings: { DisplayName: '可复用', Position: '2' } },
        },
        {
          FieldName: 'TextField',
          Name: 'VersionDescription',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'VersionDescription', Editor: 'TextArea' },
            TextFieldSettings: {},
            LuceneContentIndexSettings: { Included: true, Stored: true },
          },
        },
      ],
    },
    {
      Name: 'DynamicIndexConfigSetting',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'TypeName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'TypeName', Position: '0' } },
        },
        {
          FieldName: 'TextField',
          Name: 'TableName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'TableName', Position: '1' } },
        },
        {
          FieldName: 'TextField',
          Name: 'ConfigData',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'ConfigData',
              Editor: 'Monaco',
              Position: '3',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'EntityInfo',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'EntityInfo',
              Editor: 'Monaco',
              Position: '2',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
      ],
    },
    {
      Name: 'DbConnectionConfig',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'DatabaseProvider',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Database Provider',
              Editor: 'PredefinedList',
              Position: '0',
            },
            TextFieldPredefinedListEditorSettings: {
              Options: [
                { name: 'MySql', value: 'MySql' },
                { name: 'SqlServer', value: 'SqlServer' },
                { name: 'PostgreSQL', value: 'PostgreSQL' },
                { name: 'Oracle', value: 'Oracle' },
                { name: 'Sqlite', value: 'Sqlite' },
                { name: 'OdbcOracle', value: 'OdbcOracle' },
                { name: 'OdbcSqlServer', value: 'OdbcSqlServer' },
                { name: 'OdbcMySql', value: 'OdbcMySql' },
                { name: 'OdbcPostgreSQL', value: 'OdbcPostgreSQL' },
                { name: 'Odbc', value: 'Odbc' },
                { name: 'OdbcDameng', value: 'OdbcDameng' },
                { name: 'MsAccess', value: 'MsAccess' },
                { name: 'Dameng', value: 'Dameng' },
                { name: 'OdbcKingbaseES', value: 'OdbcKingbaseES' },
                { name: 'ShenTong', value: 'ShenTong' },
                { name: 'KingbaseES', value: 'KingbaseES' },
                { name: 'Firebird', value: 'Firebird' },
                { name: 'Custom', value: 'Custom' },
                { name: 'ClickHouse', value: 'ClickHouse' },
                { name: 'GBase', value: 'GBase' },
              ],
              Editor: 1,
              DefaultValue: 'Sqlite',
            },
            TextFieldSettings: {
              Hint: 'FreeSql支持的所有数据库，已添加 MySql, Sqlite, SqlServer.\r\n                                    其它数据库请手动添加包引用到项目中',
            },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'ConnectionString',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'ConnectionString',
              Editor: 'TextArea',
              Position: '4',
            },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'UseIntergrationAuth',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '使用集成身份认证', Position: '1' },
            BooleanFieldSettings: {},
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'UserName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'UserName', Position: '2' } },
        },
        {
          FieldName: 'TextField',
          Name: 'Password',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Password', Position: '3' } },
        },
      ],
    },
    {
      Name: 'AntdMenuItem',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'Path',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Path', Position: '0' } },
        },
        {
          FieldName: 'TextField',
          Name: 'Name',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Name', Position: '10' } },
        },
        {
          FieldName: 'TextField',
          Name: 'Icon',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Icon', Position: '9' } },
        },
        {
          FieldName: 'TextField',
          Name: 'Target',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'Target', Position: '12' },
            TextFieldSettings: { Hint: '新页面打开' },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Access',
          Settings: { ContentPartFieldSettings: { DisplayName: '页面权限', Position: '11' } },
        },
        {
          FieldName: 'BooleanField',
          Name: 'HideInMenu',
          Settings: { ContentPartFieldSettings: { DisplayName: 'HideInMenu', Position: '13' } },
        },
        {
          FieldName: 'TextField',
          Name: 'OtherConfig',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'OtherConfig',
              Editor: 'Monaco',
              Position: '14',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'MenuType',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: '页面类型',
              Editor: 'PredefinedList',
              Position: '6',
            },
            TextFieldSettings: {},
            TextFieldPredefinedListEditorSettings: {
              Options: [
                { name: '普通页面', value: 'Component' },
                { name: '节点', value: 'Node' },
                { name: '动态页面', value: 'DynamicPage' },
              ],
              Editor: 1,
              DefaultValue: 'Component',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'ContentPickerField',
          Name: 'SchemaId',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '动态页面', Position: '7' },
            ContentPickerFieldSettings: { DisplayedContentTypes: ['AmisSchema'] },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'Redirect',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Redirect', Position: '8' } },
        },
        {
          FieldName: 'BooleanField',
          Name: 'Locale',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '多语言', Position: '5' },
            TextFieldSettings: { Hint: '自定义菜单的国际化 ' },
            BooleanFieldSettings: {},
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'NumericField',
          Name: 'OrderIndex',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'OrderIndex', Position: '3' },
            NumericFieldSettings: {},
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'ContentPickerField',
          Name: 'Parent',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'Parent', Editor: 'Lucene', Position: '4' },
            ContentPickerFieldSettings: {
              DisplayedContentTypes: ['AntdMenuItem'],
              DisplayedStereotypes: [],
            },
            LuceneContentIndexSettings: { Included: true, Stored: true },
            ContentPickerFieldLuceneEditorSettings: { Index: 'amis' },
          },
        },
        {
          FieldName: 'TextField',
          Name: 'zhCN',
          Settings: { ContentPartFieldSettings: { DisplayName: '中文显示名', Position: '1' } },
        },
        {
          FieldName: 'TextField',
          Name: 'enUS',
          Settings: { ContentPartFieldSettings: { DisplayName: '英文显示名', Position: '2' } },
        },
      ],
    },
    {
      Name: 'AntdSiteGlobalSettings',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'MenuData',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'MenuData', Editor: 'Monaco', Position: '1' },
            TextFieldSettings: { Hint: 'Javascript 语法' },
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "javascript"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'SettingData',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'AntdSettingData',
              Editor: 'Monaco',
              Position: '2',
            },
            TextFieldSettings: { Hint: 'Json 语法，完整配置参考 antd LayoutSettings' },
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'SkipLoginPage',
          Settings: { ContentPartFieldSettings: { DisplayName: 'SkipLoginPage', Position: '0' } },
        },
      ],
    },
    {
      Name: 'RDBMSMappingConfig',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'TargetTable',
          Settings: { ContentPartFieldSettings: { DisplayName: 'Target Table', Position: '0' } },
        },
        {
          FieldName: 'TextField',
          Name: 'ContentTypeName',
          Settings: { ContentPartFieldSettings: { DisplayName: 'ContentTypeName', Position: '1' } },
        },
        {
          FieldName: 'TextField',
          Name: 'MappingData',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'MappingData',
              Editor: 'CodeMirror',
              Position: '2',
            },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'EnableAutoSync',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'Enable Auto Sync',
              Editor: 'Switch',
              Position: '4',
            },
          },
        },
        {
          FieldName: 'BooleanField',
          Name: 'ReadOnly',
          Settings: {
            ContentPartFieldSettings: { DisplayName: 'Read Only', Editor: 'Switch', Position: '5' },
          },
        },
      ],
    },
    {
      Name: 'ClientAppConfiguration',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'HostNames',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '允许的客户端主机名称', Editor: 'TextArea' },
            TextFieldSettings: { Hint: '多个客户端主机集合，逗号分隔', Required: true },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'ConfigurationData',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '配置信息', Editor: 'Monaco' },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options:
                '{\r\n  "automaticLayout": true,\r\n   "allowComments": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
      ],
    },
    {
      Name: 'AppPermissionItem',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'PermissionSettings',
          Settings: { ContentPartFieldSettings: { DisplayName: '页面权限定义', Position: '0' } },
        },
        {
          FieldName: 'TextField',
          Name: 'TenantName',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '租户名称', Position: '1' },
            TextFieldSettings: { Required: true },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'AppName',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '客户端名称', Position: '2' },
            TextFieldSettings: { Required: true },
            LuceneContentIndexSettings: {},
          },
        },
        {
          FieldName: 'TextField',
          Name: 'ContainerType',
          Settings: {
            ContentPartFieldSettings: { DisplayName: '权限容器名称', Position: '2' },
            TextFieldSettings: { Required: true },
            LuceneContentIndexSettings: {},
          },
        },
      ],
    },
    {
      Name: 'AppPermissionPart',
      Settings: { ContentPartSettings: { Attachable: true } },
      ContentPartFieldDefinitionRecords: [],
    },
    { Name: 'UserProfileInternal', Settings: {}, ContentPartFieldDefinitionRecords: [] },
    {
      Name: 'LiquidPage',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'BooleanField',
          Name: 'ShowHeader',
          Settings: { ContentPartFieldSettings: { DisplayName: 'ShowHeader', Position: '0' } },
        },
      ],
    },
    {
      Name: 'ContentPermissionsPart',
      Settings: {
        ContentPartSettings: {
          Attachable: true,
          DisplayName: 'Content Permissions',
          Description: 'Provides ability to control which roles can view content item.',
          DefaultPosition: '10',
        },
      },
      ContentPartFieldDefinitionRecords: [],
    },
    {
      Name: 'SalesPortalConfiguration',
      Settings: {},
      ContentPartFieldDefinitionRecords: [
        {
          FieldName: 'TextField',
          Name: 'ConfigData',
          Settings: {
            ContentPartFieldSettings: {
              DisplayName: 'ConfigData',
              Editor: 'Monaco',
              Position: '0',
            },
            TextFieldSettings: {},
            TextFieldMonacoEditorSettings: {
              Options: '{\r\n  "automaticLayout": true,\r\n  "language": "json"\r\n}',
            },
            LuceneContentIndexSettings: {},
          },
        },
      ],
    },
  ],
  Identifier: '4scv11cnbwk9rwdrtzh6hf74dp',
};

//console.log('mergeResult', deepMerge(oldDef, currentDef));

const mergeJson = (target: any, src: any) => {
  return deepMerge(target, src);
};

const jsonschema = {
  data: {
    mergeJson,
  },
  type: 'page',
  regions: ['body', 'toolbar', 'header'],
  id: 'u:83a23b2684bd',
  body: [
    {
      type: 'form',
      title: '将右侧数据合并到左侧',
      body: [
        {
          type: 'grid',
          columns: [],
          id: 'u:e2bfa915acf8',
        },
        {
          type: 'grid',
          columns: [
            {
              id: 'u:b3eb9ff40f0c',
              body: [
                {
                  type: 'editor',
                  label: '目标',
                  name: 'target',
                  id: 'u:3b1f5a609da9',
                  language: 'json',
                },
              ],
            },
            {
              id: 'u:88542a0f3111',
              body: [
                {
                  type: 'editor',
                  label: '源',
                  name: 'src',
                  id: 'u:67fe304b7997',
                  language: 'json',
                },
              ],
            },
          ],
          id: 'u:c95eeb8b7197',
        },
      ],
      id: 'u:4418153b8414',
      debug: true,
      actions: [
        {
          type: 'button',
          label: '提交',
          onEvent: {
            click: {
              actions: [
                {
                  actionType: 'custom',
                  /* 自定义JS使用说明：
                   * 1.动作执行函数doAction，可以执行所有类型的动作
                   * 2.通过上下文对象context可以获取当前组件实例，例如context.props可以获取该组件相关属性
                   * 3.事件对象event，在doAction之后执行event.stopPropagation = true;可以阻止后续动作执行
                   */

                  //   script: (context, ccc, event) => {
                  //     console.log('自定义JSclick context', context);
                  //     console.log('自定义JSclick event', event);
                  //     console.log('自定义JSclick ccc', ccc);
                  //     console.log('mergeJson', mergeJson({ a: '123' }, { b: 222 }));
                  //     // context.props.data.result = { aaa: 123123 };
                  //     // console.log('自定义JSclick context', context);
                  //     // console.log('自定义JSclick event', event);

                  //     // const myMsg = '我是自定义JS';
                  //     // doAction({
                  //     //   actionType: 'toast',
                  //     //   args: {
                  //     //     msg: myMsg,
                  //     //   },
                  //     // });
                  //   },
                  script:
                    '/* 自定义JS使用说明：\n  * 1.动作执行函数doAction，可以执行所有类型的动作\n  * 2.通过上下文对象context可以获取当前组件实例，例如context.props可以获取该组件相关属性\n  * 3.事件对象event，在doAction之后执行event.stopPropagation = true;可以阻止后续动作执行\n*/\ncontext.props.data.result = { "aaa": 123123 }\nconsole.log("自定义JSclick context", context)\nconsole.log("自定义JSclick event", event)\n\n\nconsole.log(\'mergeJson\', mergeJson({ a: \'123\' }, { b: 222 }));\n',
                },
                {
                  args: {},
                  actionType: 'submit',
                  componentId: 'u:4418153b8414',
                },
              ],
            },
          },
          id: 'u:30e113d14ebc',
          level: 'primary',
        },
      ],
    },
    {
      type: 'form',
      title: '合并结果',
      body: [
        {
          type: 'editor',
          label: '合并结果',
          name: 'result',
          id: 'u:4bc4d98959cb',
          language: 'json',
          allowFullscreen: true,
        },
      ],
      id: 'u:412ba147b429',
      actions: [],
      debug: true,
    },
  ],
};

const Tools: React.FC = () => {
  return <AMISComponent schema={jsonschema} />;
};

export default Tools;
