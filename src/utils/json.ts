import stripJsonComments from 'strip-json-comments';
export const JSONC = {
    parse: (json: string) => {
        console.log('stripJsonComments: ', stripJsonComments(json));
        return JSON.parse(stripJsonComments(json))
    }
}