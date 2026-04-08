import { UrlSegment, UrlMatchResult } from '@angular/router';

export function isbnMatcher(url: UrlSegment[]): UrlMatchResult | null {

    if (url.length === 0) return null;

    console.log(`[ISBN MATCHER]: Attempting to match URL segments:`, url);

    const isbn = url[0].path;

    if (isbn.startsWith('isbn-')) {
        console.log(`[ISBN MATCHER]: Matched URL segment:`, isbn);

        const result: UrlMatchResult = {
            consumed: [url[0]], // tell angular this path is consumed successfully by this matcher
            posParams: {
                // extract the ISBN number from the URL segment and make it available as a route parameter named 'isbnId'
                isbnId: new UrlSegment(isbn.substring(5), {})
            }
        };

        console.log(`[ISBN MATCHER]: Returning match result:`, result);
        console.log("\n\n-------------------------------------------------------------\n\n");
        return result;

    }

    console.log("\n\n-------------------------------------------------------------\n\n");
    return null;

}