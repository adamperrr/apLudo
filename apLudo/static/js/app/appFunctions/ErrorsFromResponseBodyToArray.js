export function errorsFromResponseBodyToArray(responseBody) {
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

        console.log('[errorsFromResponseBodyToArray()]', forEachResult);

        return forEachResult;
    });
}