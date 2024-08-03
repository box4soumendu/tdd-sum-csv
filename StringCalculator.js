const StringCalculator = {
    add(numbers) {
        if (!numbers) return 0;

        //splits the string based on delimiters and converts the parts to numbers. It uses RegExp to handle multiple delimiters.
        const parseNumbers = (str, delimiters) => {
            const pattern = new RegExp(delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'));
            return str.split(pattern).map(Number);
        };

         //splits the string based on the provided delimiters without using regular expressions. It uses flatMap to handle multiple delimiters.
         const parseNumbersFM = (str, delimiters) => {
            let numList = [str];
            delimiters.forEach(delimiter => {
                numList = numList.flatMap(num => num.split(delimiter));
            });
            return numList.map(Number);
        };

        //handles the extraction of custom delimiters and the remaining number string.
        const extractDelimiters = (str) => {
            if (str.startsWith('//')) {
                const parts = str.split('\n', 2);
                const customDelimiter = parts[0].substring(2);
                return { delimiters: [',', '\n', customDelimiter], numbers: parts[1] };
            }
            return { delimiters: [',', '\n'], numbers: str };
        };

        const { delimiters, numbers: numStr } = extractDelimiters(numbers);
        //Use RegExp based method
        const numList = parseNumbers(numStr, delimiters);
        //Use FlatMap based method
        //const numList = parseNumbersFM(numStr, delimiters);

        //Check for negative numbers
        const negatives = numList.filter(n => n < 0);
        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
        }

        //Add the number list
        return numList.reduce((sum, n) => sum + n, 0);
    }
};

module.exports = StringCalculator;