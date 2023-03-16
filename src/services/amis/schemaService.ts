import { excuteGraphqlQuery } from "../graphql/graphqlApi";

type SchemaData = {
    schema: any,
    pageName?: string,
    pageTitle?: string,
    schemaId?: string,
    versionId?: string,
}

export const tryLoadPageSchema = async (filter: { pageName: string, defaultSchema: any }): Promise<SchemaData> => {
    const { pageName, defaultSchema } = filter
    const result = await excuteGraphqlQuery({
        query: `{
          contentItems(
            contentType: AmisSchema
            dynamicFilter: {field: "name", value: "${pageName}"}
            pageSize: 1
            latest: true
            published: true
          ) {
            items {
              ... on AmisSchema {
                createdUtc
                description
                displayText
                schema
                name
                contentItemVersionId
                contentItemId
              }
            }
          }
        }`,
    });
    console.log('result: ', result);
    if (result?.contentItems?.items?.length > 0) {
        try {
            const { displayText, schema, name, contentItemId, contentItemVersionId } = result?.contentItems?.items[0]
            return {
                schema: JSON.parse(schema),
                pageName: name,
                pageTitle: displayText,
                schemaId: contentItemId,
                versionId: contentItemVersionId,
            }
        } catch (e) {
            console.warn('load schema error: ', e);
            return Promise.resolve({ schema: defaultSchema })
        }
    } else {
        return Promise.resolve({ schema: defaultSchema })
    }
}