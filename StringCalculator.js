const StringCalculator = {
    add(numbers) {
        if (!numbers) return 0;

        const parseNumbers = (str, delimiters) => {
            const pattern = new RegExp(delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'));
            return str.split(pattern).map(Number);
        };

        const extractDelimiters = (str) => {
            if (str.startsWith('//')) {
                const parts = str.split('\n', 2);
                const customDelimiter = parts[0].substring(2);
                return { delimiters: [',', '\n', customDelimiter], numbers: parts[1] };
            }
            return { delimiters: [',', '\n'], numbers: str };
        };

        const { delimiters, numbers: numStr } = extractDelimiters(numbers);
        const numList = parseNumbers(numStr, delimiters);

        const negatives = numList.filter(n => n < 0);
        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
        }

        return numList.reduce((sum, n) => sum + n, 0);
    }
};

module.exports = StringCalculator;