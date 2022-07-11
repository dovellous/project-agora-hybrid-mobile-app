

const Snippets = {

    htmlFormatting: {

        /**
         * This function is same as PHP's nl2br() with default parameters.
         *
         * @param {string} str Input text
         * @param {boolean} replaceMode Use replace instead of insert
         * @param {boolean} isXhtml Use XHTML
         * @return {string} Filtered text
         */
        nl2br: (str: string, replaceMode: any, isXhtml: any) => {

            var breakTag = (isXhtml) ? '<br />' : '<br>';
            var replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);

        },

        /**
         * This function inverses text from PHP's nl2br() with default parameters.
         *
         * @param {string} str Input text
         * @param {boolean} replaceMode Use replace instead of insert
         * @return {string} Filtered text
         */
        br2nl: (str: string, replaceMode: any) => {

            var replaceStr = (replaceMode) ? "\n" : '';
            // Includes <br>, <BR>, <br />, </br>
            return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
        },

    },

    getArray: (obj: { [x: string]: any; }) => {
        //console.warn(":: OBJ ::", obj);
        const arr = Object.keys(obj).map((key) => [key, obj[key]]);
        //console.warn(":: ARR ::", arr);
        return arr;
    },
    /**
     * Format bytes as human-readable text.
     *
     * @param bytes Number of bytes.
     * @param si True to use metric (SI) units, aka powers of 1000. False to use
     *           binary (IEC), aka powers of 1024.
     * @param dp Number of decimal places to display.
     *
     * @return Formatted string.
     */
    humanFileSize: (bytes: string | number, si = false, dp = 1) => {
        const thresh = si ? 1000 : 1024;

        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }

        const units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10 ** dp;

        do {
            bytes /= thresh;
            ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


        return bytes.toFixed(dp) + ' ' + units[u];
    },
    getFileSize: async (url: string | URL) => {

        var fileSize = '';

        var http = new XMLHttpRequest();

        http.open('HEAD', url, false); // false = Synchronous

        http.send(null); // it will stop here until this http request is complete

        // when we are here, we already have a response, b/c we used Synchronous XHR

        if (http.status === 200) {

            fileSize = await http.getResponseHeader('content-length');

            return fileSize;

        } else {

            return 0;

        }

    }

}

export default Snippets;