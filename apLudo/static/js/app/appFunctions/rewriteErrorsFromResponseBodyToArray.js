export function rewriteErrorsFromResponseBodyToArray(responseBody) {
    return Object.keys(responseBody).map( key => {
        let forEachResult = [];

        if (Array.isArray(responseBody[key])) {
            responseBody[key].forEach(item => {
                forEachResult = [...forEachResult, `${key}: ${item}`];
            });
        }
        else {
            forEachResult = [...forEachResult, `${key}: ${responseBody[key]}`];
        }

        console.log('[rewriteErrorsFromResponseBodyToArray]', forEachResult);

        return forEachResult;
    });
}