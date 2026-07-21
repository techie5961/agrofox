// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * RandomBetween - Returns random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 * @example RandomBetween(1, 10) // 7
 */
function RandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * RandomFloat - Returns random float between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random float
 * @example RandomFloat(1.5, 5.5) // 3.78
 */
function RandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * ClampNumber - Restricts number within min/max range
 * @param {number} value - Value to clamp
 * @param {number} min - Lower bound
 * @param {number} max - Upper bound
 * @returns {number} Clamped value
 * @example ClampNumber(15, 1, 10) // 10
 */
function ClampNumber(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * ToCurrency - Formats number as currency
 * @param {number} value - Number to format
 * @param {string} locale - Locale (default: 'en-US')
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency
 * @example ToCurrency(1234.56) // '$1,234.56'
 */
function ToCurrency(value, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value);
}

/**
 * ToPercentage - Converts number to percentage
 * @param {number} value - Number to convert
 * @param {number} decimals - Decimal places (default: 2)
 * @returns {string} Percentage string
 * @example ToPercentage(0.1234) // '12.34%'
 */
function ToPercentage(value, decimals = 2) {
    return (value * 100).toFixed(decimals) + '%';
}

// ============================================
// TYPE CHECKING - IS METHODS
// ============================================

/**
 * IsString - Checks if value is a string
 * @example IsString('hello') // true
 */
function IsString(value) {
    return typeof value === 'string' || value instanceof String;
}

/**
 * IsNumber - Checks if value is a number (not NaN)
 * @example IsNumber(42) // true
 */
function IsNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * IsBoolean - Checks if value is boolean
 * @example IsBoolean(true) // true
 */
function IsBoolean(value) {
    return typeof value === 'boolean' || value instanceof Boolean;
}

/**
 * IsArray - Checks if value is an array
 * @example IsArray([1,2,3]) // true
 */
function IsArray(value) {
    return Array.isArray(value);
}

/**
 * IsObject - Checks if value is a plain object (not null, array, or function)
 * @example IsObject({a:1}) // true
 */
function IsObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * IsFunction - Checks if value is a function
 * @example IsFunction(() => {}) // true
 */
function IsFunction(value) {
    return typeof value === 'function';
}

/**
 * IsNull - Checks if value is null
 * @example IsNull(null) // true
 */
function IsNull(value) {
    return value === null;
}

/**
 * IsUndefined - Checks if value is undefined
 * @example IsUndefined(undefined) // true
 */
function IsUndefined(value) {
    return value === undefined;
}

/**
 * IsEmpty - Checks if value is empty (null, undefined, '', [], {})
 * @example IsEmpty([]) // true
 */
function IsEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

/**
 * IsEmail - Validates email format
 * @example IsEmail('test@test.com') // true
 */
function IsEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return IsString(value) && regex.test(value);
}

/**
 * IsURL - Validates URL format
 * @example IsURL('https://example.com') // true
 */
function IsURL(value) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

/**
 * IsPhone - Validates phone number (US format)
 * @example IsPhone('123-456-7890') // true
 */
function IsPhone(value) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return IsString(value) && regex.test(value);
}

/**
 * IsDate - Checks if value is valid date
 * @example IsDate('2026-07-02') // true
 */
function IsDate(value) {
    return !isNaN(new Date(value).getTime());
}

/**
 * IsInteger - Checks if value is integer
 * @example IsInteger(42) // true
 */
function IsInteger(value) {
    return Number.isInteger(value);
}

/**
 * IsFloat - Checks if value is float
 * @example IsFloat(3.14) // true
 */
function IsFloat(value) {
    return IsNumber(value) && !Number.isInteger(value);
}

/**
 * IsEven - Checks if number is even
 * @example IsEven(4) // true
 */
function IsEven(value) {
    return IsNumber(value) && value % 2 === 0;
}

/**
 * IsOdd - Checks if number is odd
 * @example IsOdd(5) // true
 */
function IsOdd(value) {
    return IsNumber(value) && value % 2 !== 0;
}

/**
 * IsPrime - Checks if number is prime
 * @example IsPrime(7) // true
 */
function IsPrime(value) {
    if (!IsNumber(value) || value < 2) return false;
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i === 0) return false;
    }
    return true;
}

/**
 * IsPalindrome - Checks if string is palindrome
 * @example IsPalindrome('racecar') // true
 */
function IsPalindrome(value) {
    if (!IsString(value)) return false;
    const cleaned = value.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * FilterArray - Generic array filter with custom condition
 * @example FilterArray([1,2,3,4,5], n => n > 3) // [4,5]
 */
function FilterArray(arr, condition) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (condition(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
}

/**
 * FilterUnique - Removes duplicate values from array
 * @example FilterUnique([1,2,2,3,3,4]) // [1,2,3,4]
 */
function FilterUnique(arr) {
    return [...new Set(arr)];
}

/**
 * FilterFalsy - Removes falsy values (null, undefined, false, 0, '', NaN)
 * @example FilterFalsy([0,1,false,2,'',3]) // [1,2,3]
 */
function FilterFalsy(arr) {
    return FilterArray(arr, item => !!item);
}

/**
 * FilterByProperty - Filters objects by matching property value
 * @example FilterByProperty(users, 'age', 25)
 */
function FilterByProperty(arr, key, value) {
    return FilterArray(arr, item => item[key] === value);
}

/**
 * FilterByProperties - Filters objects matching multiple property values
 * @example FilterByProperties(users, { age:25, active:true })
 */
function FilterByProperties(arr, filters) {
    return FilterArray(arr, item => {
        for (const key in filters) {
            if (item[key] !== filters[key]) return false;
        }
        return true;
    });
}

/**
 * GroupBy - Groups array items by key
 * @example GroupBy(users, 'age') // {25: [...], 30: [...]}
 */
function GroupBy(arr, key) {
    const result = {};
    for (const item of arr) {
        const groupKey = item[key];
        if (!result[groupKey]) result[groupKey] = [];
        result[groupKey].push(item);
    }
    return result;
}

/**
 * SortBy - Sorts array by property or custom function
 * @example SortBy(users, 'age', 'desc')
 */
function SortBy(arr, key, order = 'asc') {
    const result = [...arr];
    result.sort((a, b) => {
        const aVal = typeof key === 'function' ? key(a) : a[key];
        const bVal = typeof key === 'function' ? key(b) : b[key];
        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
    return result;
}

/**
 * Pluck - Extracts array of property values from objects
 * @example Pluck(users, 'name') // ['Alice', 'Bob']
 */
function Pluck(arr, key) {
    return arr.map(item => item[key]);
}

/**
 * Intersection - Returns common elements between arrays
 * @example Intersection([1,2,3], [2,3,4]) // [2,3]
 */
function Intersection(arr1, arr2) {
    const set = new Set(arr2);
    return arr1.filter(item => set.has(item));
}

/**
 * Difference - Returns elements in arr1 not in arr2
 * @example Difference([1,2,3], [2,3,4]) // [1]
 */
function Difference(arr1, arr2) {
    const set = new Set(arr2);
    return arr1.filter(item => !set.has(item));
}

/**
 * Union - Returns unique elements from multiple arrays
 * @example Union([1,2], [2,3], [3,4]) // [1,2,3,4]
 */
function Union(...arrays) {
    return [...new Set(arrays.flat())];
}

/**
 * ShuffleArray - Randomly shuffles array (Fisher-Yates algorithm)
 * @example ShuffleArray([1,2,3,4,5]) // [3,1,5,2,4]
 */
function ShuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = RandomBetween(0, i);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * RandomPick - Returns random item from array
 * @example RandomPick(['apple','banana','cherry']) // 'banana'
 */
function RandomPick(arr) {
    return arr[RandomBetween(0, arr.length - 1)];
}

/**
 * ChunkArray - Splits array into smaller arrays of given size
 * @example ChunkArray([1,2,3,4,5,6], 2) // [[1,2],[3,4],[5,6]]
 */
function ChunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

/**
 * Flatten - Flattens nested arrays to specified depth
 * @example Flatten([1,[2,[3,4]]], 1) // [1,2,[3,4]]
 */
function Flatten(arr, depth = 1) {
    return arr.flat(depth);
}

/**
 * Zip - Combines multiple arrays into array of tuples
 * @example Zip([1,2], ['a','b']) // [[1,'a'],[2,'b']]
 */
function Zip(...arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    const result = [];
    for (let i = 0; i < maxLength; i++) {
        result.push(arrays.map(arr => arr[i]));
    }
    return result;
}

/**
 * Unzip - Splits array of tuples into multiple arrays
 * @example Unzip([[1,'a'],[2,'b']]) // [[1,2], ['a','b']]
 */
function Unzip(arr) {
    return arr.reduce((acc, tuple) => {
        tuple.forEach((item, i) => {
            if (!acc[i]) acc[i] = [];
            acc[i].push(item);
        });
        return acc;
    }, []);
}

// ============================================
// OBJECT UTILITIES
// ============================================

/**
 * PickKeys - Creates object with only specified keys
 * @example PickKeys({a:1,b:2,c:3}, ['a','c']) // {a:1,c:3}
 */
function PickKeys(obj, keys) {
    const result = {};
    for (const key of keys) {
        if (key in obj) result[key] = obj[key];
    }
    return result;
}

/**
 * OmitKeys - Creates object excluding specified keys
 * @example OmitKeys({a:1,b:2,c:3}, ['b']) // {a:1,c:3}
 */
function OmitKeys(obj, keys) {
    const result = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
}

/**
 * DeepClone - Deep clones object/array
 * @example DeepClone({a:1,b:{c:2}}) // {a:1,b:{c:2}}
 */
function DeepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * MergeDeep - Deep merges objects (right overrides left)
 * @example MergeDeep({a:1}, {b:2}, {a:3}) // {a:3,b:2}
 */
function MergeDeep(target, ...sources) {
    const result = { ...target };
    for (const source of sources) {
        for (const key in source) {
            if (IsObject(source[key]) && IsObject(result[key])) {
                result[key] = MergeDeep(result[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }
    return result;
}

/**
 * GetNested - Safely gets nested property using dot notation
 * @example GetNested({user: {name: 'John'}}, 'user.name') // 'John'
 */
function GetNested(obj, path, defaultValue = undefined) {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
        if (result === null || result === undefined || !(key in result)) {
            return defaultValue;
        }
        result = result[key];
    }
    return result;
}

/**
 * SetNested - Sets nested property using dot notation
 * @example SetNested({}, 'user.name', 'John') // {user: {name: 'John'}}
 */
function SetNested(obj, path, value) {
    const result = { ...obj };
    const keys = path.split('.');
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
    return result;
}

/**
 * TransformKeys - Transforms object keys using function
 * @example TransformKeys({a:1, b:2}, key => key.toUpperCase()) // {A:1, B:2}
 */
function TransformKeys(obj, transformFn) {
    const result = {};
    for (const key in obj) {
        const newKey = transformFn(key);
        result[newKey] = obj[key];
    }
    return result;
}

/**
 * InvertKeys - Swaps keys and values
 * @example InvertKeys({a:1, b:2}) // {1:'a', 2:'b'}
 */
function InvertKeys(obj) {
    const result = {};
    for (const key in obj) {
        result[obj[key]] = key;
    }
    return result;
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * RandomString - Generates random alphanumeric string
 * @param {number} length - Desired string length (default: 8)
 * @returns {string} Random string
 * @example RandomString(10) // 'aB3dEf9GhI'
 */
function RandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[RandomBetween(0, chars.length - 1)];
    }
    return result;
}

/**
 * Truncate - Truncates string to max length with ellipsis
 * @example Truncate('Hello World', 5) // 'Hello...'
 */
function Truncate(str, maxLength = 50, suffix = '...') {
    if (!IsString(str) || str.length <= maxLength) return str;
    return str.slice(0, maxLength) + suffix;
}

/**
 * CamelCase - Converts string to camelCase
 * @example CamelCase('hello world') // 'helloWorld'
 */
function CamelCase(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

/**
 * SnakeCase - Converts string to snake_case
 * @example SnakeCase('Hello World') // 'hello_world'
 */
function SnakeCase(str) {
    return str.replace(/\s+/g, '_').toLowerCase();
}

/**
 * KebabCase - Converts string to kebab-case
 * @example KebabCase('Hello World') // 'hello-world'
 */
function KebabCase(str) {
    return str.replace(/\s+/g, '-').toLowerCase();
}

/**
 * TitleCase - Converts string to Title Case
 * @example TitleCase('hello world') // 'Hello World'
 */
function TitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Slugify - Creates URL-friendly slug
 * @example Slugify('Hello World!') // 'hello-world'
 */
function Slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ============================================
// DATE & TIME UTILITIES
// ============================================

/**
 * FormatDate - Formats date object
 * @example FormatDate(new Date(), 'YYYY-MM-DD') // '2026-07-02'
 */
function FormatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * TimeAgo - Returns human-readable time difference
 * @example TimeAgo('2026-07-01') // '1 day ago'
 */
function TimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return years + ' year' + (years > 1 ? 's' : '') + ' ago';
    if (months > 0) return months + ' month' + (months > 1 ? 's' : '') + ' ago';
    if (days > 0) return days + ' day' + (days > 1 ? 's' : '') + ' ago';
    if (hours > 0) return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
    if (minutes > 0) return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
    return 'just now';
}

/**
 * AddDays - Adds days to date
 * @example AddDays(new Date(), 7) // Date + 7 days
 */
function AddDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * GetDaysBetween - Returns number of days between two dates
 * @example GetDaysBetween('2026-07-01', '2026-07-10') // 9
 */
function GetDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2 - d1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ============================================
// MATH UTILITIES
// ============================================

/**
 * Sum - Sums array of numbers
 * @example Sum([1,2,3,4]) // 10
 */
function Sum(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Average - Calculates average of array
 * @example Average([1,2,3,4]) // 2.5
 */
function Average(arr) {
    return Sum(arr) / arr.length;
}

/**
 * Median - Calculates median of array
 * @example Median([1,3,5]) // 3
 */
function Median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Mode - Finds most frequent value(s)
 * @example Mode([1,2,2,3,3]) // ['2','3']
 */
function Mode(arr) {
    const frequency = {};
    let maxFreq = 0;
    const result = [];
    for (const item of arr) {
        frequency[item] = (frequency[item] || 0) + 1;
        if (frequency[item] > maxFreq) maxFreq = frequency[item];
    }
    for (const key in frequency) {
        if (frequency[key] === maxFreq) result.push(key);
    }
    return result.length === 1 ? result[0] : result;
}

/**
 * Factorial - Calculates factorial of number
 * @example Factorial(5) // 120
 */
function Factorial(n) {
    if (n < 0) return 0;
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

/**
 * Fibonacci - Returns Fibonacci number at position n
 * @example Fibonacci(7) // 13
 */
function Fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

// ============================================
// PROMISE & ASYNC UTILITIES
// ============================================

/**
 * Delay - Returns promise that resolves after milliseconds
 * @example await Delay(1000) // Waits 1 second
 */
function Delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry - Retries async function with delay
 * @example await Retry(() => fetch(url), 3, 1000)
 */
async function Retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === retries - 1) throw err;
            await Delay(delay);
        }
    }
}

/**
 * Debounce - Creates debounced function
 * @example const debounced = Debounce(fn, 300)
 */
function Debounce(fn, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Throttle - Creates throttled function
 * @example const throttled = Throttle(fn, 300)
 */
function Throttle(fn, limit = 300) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// CHAINING HELPER (Optional)
// ============================================

/**
 * Chain - Wraps value for fluent method chaining
 * @example Chain([1,2,3,4,5]).filter(n=>n>2).shuffle().value
 */
function Chain(value) {
    const wrapper = {
        value: value,
        
        // Type checking
        isString() { wrapper.value = IsString(wrapper.value); return wrapper; },
        isNumber() { wrapper.value = IsNumber(wrapper.value); return wrapper; },
        isArray() { wrapper.value = IsArray(wrapper.value); return wrapper; },
        isObject() { wrapper.value = IsObject(wrapper.value); return wrapper; },
        isEmpty() { wrapper.value = IsEmpty(wrapper.value); return wrapper; },
        isEmail() { wrapper.value = IsEmail(wrapper.value); return wrapper; },
        isURL() { wrapper.value = IsURL(wrapper.value); return wrapper; },
        isPalindrome() { wrapper.value = IsPalindrome(wrapper.value); return wrapper; },
        
        // Array methods
        filter(condition) { wrapper.value = FilterArray(wrapper.value, condition); return wrapper; },
        unique() { wrapper.value = FilterUnique(wrapper.value); return wrapper; },
        falsy() { wrapper.value = FilterFalsy(wrapper.value); return wrapper; },
        shuffle() { wrapper.value = ShuffleArray(wrapper.value); return wrapper; },
        chunk(size) { wrapper.value = ChunkArray(wrapper.value, size); return wrapper; },
        pick() { wrapper.value = RandomPick(wrapper.value); return wrapper; },
        groupBy(key) { wrapper.value = GroupBy(wrapper.value, key); return wrapper; },
        sortBy(key, order) { wrapper.value = SortBy(wrapper.value, key, order); return wrapper; },
        pluck(key) { wrapper.value = Pluck(wrapper.value, key); return wrapper; },
        flatten(depth) { wrapper.value = Flatten(wrapper.value, depth); return wrapper; },
        
        // Object methods
        pickKeys(keys) { wrapper.value = PickKeys(wrapper.value, keys); return wrapper; },
        omitKeys(keys) { wrapper.value = OmitKeys(wrapper.value, keys); return wrapper; },
        deepClone() { wrapper.value = DeepClone(wrapper.value); return wrapper; },
        mergeDeep(...sources) { wrapper.value = MergeDeep(wrapper.value, ...sources); return wrapper; },
        transformKeys(fn) { wrapper.value = TransformKeys(wrapper.value, fn); return wrapper; },
        invertKeys() { wrapper.value = InvertKeys(wrapper.value); return wrapper; },
        
        // Number methods
        clamp(min, max) { wrapper.value = ClampNumber(wrapper.value, min, max); return wrapper; },
        toCurrency(locale, currency) { wrapper.value = ToCurrency(wrapper.value, locale, currency); return wrapper; },
        toPercentage(decimals) { wrapper.value = ToPercentage(wrapper.value, decimals); return wrapper; },
        
        // String methods
        truncate(maxLength, suffix) { wrapper.value = Truncate(wrapper.value, maxLength, suffix); return wrapper; },
        camelCase() { wrapper.value = CamelCase(wrapper.value); return wrapper; },
        snakeCase() { wrapper.value = SnakeCase(wrapper.value); return wrapper; },
        kebabCase() { wrapper.value = KebabCase(wrapper.value); return wrapper; },
        titleCase() { wrapper.value = TitleCase(wrapper.value); return wrapper; },
        slugify() { wrapper.value = Slugify(wrapper.value); return wrapper; },
    };
    return wrapper;
}

// ============================================
// EXPORT
// ============================================

// export { 
//     RandomBetween, RandomFloat, ClampNumber, ToCurrency, ToPercentage,
//     IsString, IsNumber, IsBoolean, IsArray, IsObject, IsFunction, 
//     IsNull, IsUndefined, IsEmpty, IsEmail, IsURL, IsPhone, IsDate,
//     IsInteger, IsFloat, IsEven, IsOdd, IsPrime, IsPalindrome,
//     FilterArray, FilterUnique, FilterFalsy, FilterByProperty, FilterByProperties,
//     GroupBy, SortBy, Pluck, Intersection, Difference, Union,
//     ShuffleArray, RandomPick, ChunkArray, Flatten, Zip, Unzip,
//     PickKeys, OmitKeys, DeepClone, MergeDeep, GetNested, SetNested,
//     TransformKeys, InvertKeys,
//     RandomString, Truncate, CamelCase, SnakeCase, KebabCase, TitleCase, Slugify,
//     FormatDate, TimeAgo, AddDays, GetDaysBetween,
//     Sum, Average, Median, Mode, Factorial, Fibonacci,
//     Delay, Retry, Debounce, Throttle,
//     Chain
// };


// ============================================
// HAMMER.JS v2.0.7 + EASY GESTURE WRAPPER
// With Scroll Prevention & Position Data
// ============================================
//
// 📖 HOW TO USE WITH POSITION DATA:
// ============================================
//
// 1. Include this file in your HTML:
//    <script src="gesture.js"></script>
//
// 2. Get any HTML element:
//    const myElement = document.getElementById('myBox');
//
// 3. ALL callbacks receive an event object with position data:
//
//    // SWIPE EXAMPLES - event object contains:
//    Gesture.left(myElement, (event) => {
//        console.log('Center X:', event.center.x);      // Current X position
//        console.log('Center Y:', event.center.y);      // Current Y position
//        console.log('Delta X:', event.deltaX);         // Distance moved X
//        console.log('Delta Y:', event.deltaY);         // Distance moved Y
//        console.log('Velocity:', event.velocity);      // Speed of swipe
//        console.log('Direction:', event.direction);    // Which direction
//        console.log('Target:', event.target);          // DOM element
//        console.log('Time:', event.timeStamp);         // Timestamp
//    });
//
//    // Same for right, up, down, and swipe:
//    Gesture.right(myElement, (event) => {
//        console.log('Position:', event.center.x, event.center.y);
//    });
//
//    // LONG PRESS - also returns position data:
//    Gesture.hold(myElement, (event) => {
//        console.log('Press position X:', event.center.x);
//        console.log('Press position Y:', event.center.y);
//        console.log('Target element:', event.target);
//    });
//
//    // ANY SWIPE - get direction + position:
//    Gesture.swipe(myElement, (event) => {
//        console.log('Swipe type:', event.type);        // swipeleft, swiperight, etc.
//        console.log('Start X:', event.center.x);
//        console.log('Start Y:', event.center.y);
//        console.log('Distance:', event.distance);
//    });
//
// ============================================
// 📝 COMPLETE EVENT PROPERTIES:
// ============================================
//
// event.center      - { x, y } current center position
// event.deltaX      - X distance moved since start
// event.deltaY      - Y distance moved since start
// event.deltaTime   - Time elapsed since start (ms)
// event.distance    - Total distance moved
// event.direction   - Direction constant (1=left, 2=right, 4=up, 8=down)
// event.velocity    - Current velocity
// event.velocityX   - X velocity
// event.velocityY   - Y velocity
// event.target      - The DOM element that received the gesture
// event.srcEvent    - Original browser event
// event.timeStamp   - Timestamp of the event
// event.type        - Event name (swipeleft, swiperight, etc.)
// event.pointerType - 'touch', 'mouse', or 'pen'
//
// ============================================
// 📝 COMPLETE EXAMPLE WITH POSITIONS:
// ============================================
//
// <div id="myBox" style="width:300px;height:300px;background:blue;">
//   Swipe Me
// </div>
// <div id="coords">Position: </div>
//
// <script>
//   const box = document.getElementById('myBox');
//   const coords = document.getElementById('coords');
//   
//   // Show live position on any swipe
//   Gesture.swipe(box, (event) => {
//       coords.innerHTML = `Position: X=${Math.round(event.center.x)}, Y=${Math.round(event.center.y)}`;
//   });
//   
//   // Different actions per direction
//   Gesture.left(box, (event) => {
//       console.log(`Swiped left from X=${event.center.x}`);
//       box.style.background = 'red';
//   });
//   
//   Gesture.right(box, (event) => {
//       console.log(`Swiped right from X=${event.center.x}`);
//       box.style.background = 'green';
//   });
//   
//   Gesture.hold(box, (event) => {
//       console.log(`Long pressed at X=${event.center.x}, Y=${event.center.y}`);
//       box.style.background = 'purple';
//   });
// </script>
//
// ============================================
// ⚠️ IMPORTANT CSS:
// ============================================
//
// .my-gesture-element {
//     touch-action: none;  /* Prevents browser scroll/pinch */
//     user-select: none;   /* Prevents text selection while swiping */
// }
//
// ============================================
// 🎯 AVAILABLE METHODS:
// ============================================
//
// Gesture.left(element, callback)    - Swipe left (callback gets event with position)
// Gesture.right(element, callback)   - Swipe right (callback gets event with position)
// Gesture.up(element, callback)      - Swipe up (callback gets event with position)
// Gesture.down(element, callback)    - Swipe down (callback gets event with position)
// Gesture.hold(element, callback)    - Long press (callback gets event with position)
// Gesture.swipe(element, callback)   - Any swipe (callback gets event with position)
// Gesture.off(element, event, fn)    - Remove event listener
// Gesture.destroy(element)           - Remove all gestures
//
// ============================================
// END OF INSTRUCTIONS
// ============================================

// Hammer.js (minified)
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.7",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");

// ============================================
// EASY GESTURE WRAPPER - With Scroll Prevention
// ============================================
const Gesture = (function() {
    const instances = new Map();
    
    function getInstance(element) {
        if (!instances.has(element)) {
            // Create Hammer instance with touch-action prevention
            const hammer = new Hammer(element);
            
            // Prevent default touch behavior to stop scrolling
            hammer.get('swipe').set({ 
                direction: Hammer.DIRECTION_ALL,
                threshold: 10,
                velocity: 0.3
            });
            
            // Block default touchmove to prevent scrolling
            element.addEventListener('touchmove', function(e) {
                // Only prevent if gesture is active
                if (hammer.session && hammer.session.curRecognizer) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            // Also prevent mouse wheel scroll during drag on desktop
            element.addEventListener('wheel', function(e) {
                if (hammer.session && hammer.session.curRecognizer) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            instances.set(element, hammer);
        }
        return instances.get(element);
    }
    
    return {
        // Swipe directions (callback receives event with position data)
        left: (element, callback) => getInstance(element).on('swipeleft', callback),
        right: (element, callback) => getInstance(element).on('swiperight', callback),
        up: (element, callback) => getInstance(element).on('swipeup', callback),
        down: (element, callback) => getInstance(element).on('swipedown', callback),
        
        // Long press / hold (callback receives event with position data)
        hold: (element, callback) => getInstance(element).on('press', callback),
        
        // Any swipe direction (callback receives event with position data)
        swipe: (element, callback) => {
            const h = getInstance(element);
            h.on('swipeleft swiperight swipeup swipedown', callback);
        },
        
        // Remove event listener
        off: (element, event, callback) => {
            const h = instances.get(element);
            if (h) h.off(event, callback);
        },
        
        // Clean up and remove all gestures
        destroy: (element) => {
            const h = instances.get(element);
            if (h) {
                h.destroy();
                instances.delete(element);
            }
        }
    };
})();





// custom marquee
function CustomMarquee() {
    class ViteCSSMarquee {
        constructor(element) {
            this.element = element;
            this.wrapper = null;
            this.animationId = null;
            this.isRunning = false;
            this.canAnimate = true;
            this.currentX = 0;
            this.startX = 0;
            this.endX = 0;
            this.duration = 0;
            this.startTime = null;
            this.eventListeners = [];
            this.config = null;
            this.resizeTimer = null;
            this.resizeObserver = null;
            this.visibilityObserver = null;
            this.contentObserver = null;
            this.RESIZE_DELAY = 250;
            
            this.config = this.parseAttributes();
            this.init();
        }

        parseAttributes() {
            return {
                core: {
                    active: this.element.hasAttribute("vitecss-marquee"),
                    id: this.element.getAttribute("vitecss-marquee-id") || undefined
                },
                animation: {
                    speed: Number(this.element.getAttribute("vitecss-marquee-speed") || 50),
                    direction: this.element.getAttribute("vitecss-marquee-direction") || "left",
                    gap: Number(this.element.getAttribute("vitecss-marquee-gap") || 20),
                    duplicates: Number(this.element.getAttribute("vitecss-marquee-duplicates") || 0)
                },
                behavior: {
                    pauseOnHover: this.element.getAttribute("vitecss-marquee-pause-hover") === "true" || false,
                    loop: Number(this.element.getAttribute("vitecss-marquee-loop") || -1),
                    pauseWhenNotVisible: this.element.getAttribute("vitecss-marquee-pause-visible") === "true" || false
                },
                checkOverflow: {
                    toCheck: this.element.hasAttribute('vitecss-marquee-check')
                }
            };
        }

        init() {
            this.setupWrapper();
            
            setTimeout(() => {
                this.checkAndStart();
            }, 100);
            
            this.bindEvents();
            this.bindResizeEvent();
            this.setupContentObserver();
            
            if (this.config.behavior.pauseWhenNotVisible) {
                this.setupVisibilityObserver();
            }
        }

        checkAndStart() {
            if (this.shouldAnimate()) {
                this.start();
            } else {
                console.log(`[Marquee ${this.config.core.id || 'unnamed'}] Content does not overflow - animation prevented`);
                this.stop();
                this.canAnimate = false;
            }
        }

        shouldAnimate() {
            if (!this.config.checkOverflow.toCheck) {
                return true;
            }
            
            const containerWidth = this.element.clientWidth;
            const contentWidth = this.getTotalWidth();
            const overflows = contentWidth > containerWidth;
            
            return overflows;
        }

        recheckOverflow() {
            if (!this.config.checkOverflow.toCheck) return;
            
            // Store current state
            const wasAnimating = this.isRunning;
            
            // Re-evaluate
            const shouldAnimate = this.shouldAnimate();
            
            if (shouldAnimate && !this.canAnimate) {
                console.log('[Marquee] Overflow detected - starting animation');
                this.canAnimate = true;
                this.stop();
                this.start();
            } else if (!shouldAnimate && this.canAnimate) {
                console.log('[Marquee] No overflow - stopping animation');
                this.canAnimate = false;
                this.stop();
            } else if (shouldAnimate && wasAnimating) {
                // If already animating, just continue
                return;
            }
        }

        setupContentObserver() {
            // Create a mutation observer to watch for content changes
            this.contentObserver = new MutationObserver((mutations) => {
                let contentChanged = false;
                
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        contentChanged = true;
                    }
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        contentChanged = true;
                    }
                });
                
                if (contentChanged) {
                    console.log('[Marquee] Content changed - rechecking overflow');
                    // Small delay to allow DOM to update
                    setTimeout(() => {
                        this.recheckOverflow();
                    }, 50);
                }
            });
            
            // Observe the wrapper for content changes
            if (this.wrapper) {
                this.contentObserver.observe(this.wrapper, {
                    childList: true,
                    subtree: true,
                    characterData: true,
                    attributes: true,
                    attributeFilter: ['style', 'class']
                });
            }
            
            // Also observe the original element for attribute changes
            this.contentObserver.observe(this.element, {
                attributes: true,
                attributeFilter: ['style', 'class']
            });
            
            this.eventListeners.push(() => this.contentObserver.disconnect());
        }

        setupWrapper() {
            this.setWrapperStyles();
            this.createClonesAndAddStyles();
        }

        setWrapperStyles() {
            this.wrapper = document.createElement("div");
            this.wrapper.style.display = "flex";
            this.wrapper.style.flexWrap = "nowrap";
            this.wrapper.style.position = "relative";
            this.wrapper.style.width = "max-content";
            this.wrapper.style.willChange = "transform";
            this.wrapper.style.backfaceVisibility = "hidden";
            this.wrapper.style.justifyContent = "flex-start";
            this.wrapper.style.alignItems = "center";
            this.wrapper.style.gap = this.getGapValue();
        }

        createClonesAndAddStyles() {
            let gap = this.getGapValue();
            
            let originalChildren = Array.from(this.element.children);
            
            if (originalChildren.length === 0) {
                console.error('[Marquee] No content found inside marquee element');
                return;
            }
            
            let originalHTML = this.element.innerHTML;
            
            this.element.style.justifyContent = "flex-start";
            this.element.style.overflow = "hidden";
            this.element.style.width = "100%";
            this.element.style.position = "relative";
            this.element.innerHTML = "";
            
            this.wrapper.innerHTML = originalHTML;
            
            let wrapperChildren = this.wrapper.children;
            for (let i = 0; i < wrapperChildren.length; i++) {
                wrapperChildren[i].style.flexShrink = "0";
                wrapperChildren[i].style.minWidth = "max-content";
            }
            
            let duplicates = this.config.animation.duplicates;
            for (let i = 0; i < duplicates; i++) {
                let clone = document.createElement("div");
                clone.innerHTML = originalHTML;
                clone.style.display = "flex";
                clone.style.gap = gap;
                clone.style.flexShrink = "0";
                
                let cloneChildren = clone.children;
                for (let j = 0; j < cloneChildren.length; j++) {
                    cloneChildren[j].style.flexShrink = "0";
                    cloneChildren[j].style.minWidth = "max-content";
                }
                
                this.wrapper.appendChild(clone);
            }
            
            this.element.appendChild(this.wrapper);
        }

        getGapValue() {
            let computedGap = window.getComputedStyle(this.element).getPropertyValue("gap");
            if (computedGap && computedGap !== "0px" && computedGap !== "normal") {
                return computedGap;
            }
            return `${this.config.animation.gap}px`;
        }

        getTotalWidth() {
            if (!this.wrapper || !this.wrapper.firstElementChild) return 0;
            
            let gapValue = parseFloat(this.getGapValue()) || 0;
            let totalWidth = 0;
            
            for (let i = 0; i < this.wrapper.children.length; i++) {
                totalWidth += this.wrapper.children[i].scrollWidth;
                if (i < this.wrapper.children.length - 1) {
                    totalWidth += gapValue;
                }
            }
            
            return totalWidth;
        }

        startAnimation() {
            if (!this.shouldAnimate()) {
                console.log('[Marquee] startAnimation prevented - no overflow');
                this.canAnimate = false;
                return;
            }
            
            if (!this.wrapper) {
                console.error('[Marquee] Wrapper not initialized');
                return;
            }
            
            let totalWidth = this.getTotalWidth();
            let containerWidth = this.element.clientWidth;
            let direction = this.config.animation.direction;
            
            if (totalWidth === 0) {
                console.error('[Marquee] Total width is 0, cannot animate');
                return;
            }
            
            if (direction === "left") {
                this.startX = containerWidth;
                this.endX = -totalWidth;
            } else {
                this.startX = -totalWidth;
                this.endX = containerWidth;
            }
            
            let distance = Math.abs(this.endX - this.startX);
            this.duration = (distance / this.config.animation.speed) * 1000;
            
            this.currentX = this.startX;
            this.wrapper.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
            
            this.isRunning = true;
            this.startTime = performance.now();
            this.animate();
        }

        animate(currentTime = null) {
            if (!this.isRunning) return;
            
            if (this.config.checkOverflow.toCheck && !this.shouldAnimate()) {
                this.pause();
                this.canAnimate = false;
                return;
            }
            
            if (currentTime === null) {
                currentTime = performance.now();
            }
            
            let elapsed = currentTime - this.startTime;
            let progress = Math.min(elapsed / this.duration, 1);
            
            this.currentX = this.startX + (this.endX - this.startX) * progress;
            this.wrapper.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
            
            if (progress >= 1) {
                this.currentX = this.startX;
                this.wrapper.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
                this.startTime = performance.now();
                this.animationId = requestAnimationFrame((time) => this.animate(time));
            } else {
                this.animationId = requestAnimationFrame((time) => this.animate(time));
            }
        }

        bindEvents() {
            if (this.config.behavior.pauseOnHover) {
                let pauseHandler = () => this.pause();
                let resumeHandler = () => this.resume();
                
                this.element.addEventListener("mouseenter", pauseHandler);
                this.element.addEventListener("mouseleave", resumeHandler);
                
                this.eventListeners.push(() => {
                    this.element.removeEventListener("mouseenter", pauseHandler);
                    this.element.removeEventListener("mouseleave", resumeHandler);
                });
            }
        }

        bindResizeEvent() {
            let resizeHandler = () => {
                if (this.resizeTimer) clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(() => {
                    let wasRunning = this.isRunning;
                    if (wasRunning) this.pause();
                    this.updateDimensions();
                    this.recheckOverflow();
                    if (wasRunning && this.canAnimate) this.resume();
                }, this.RESIZE_DELAY);
            };
            
            window.addEventListener("resize", resizeHandler);
            this.eventListeners.push(() => {
                window.removeEventListener("resize", resizeHandler);
                if (this.resizeTimer) clearTimeout(this.resizeTimer);
            });
            
            if (window.ResizeObserver) {
                this.resizeObserver = new ResizeObserver(() => {
                    if (this.resizeTimer) clearTimeout(this.resizeTimer);
                    this.resizeTimer = setTimeout(() => {
                        this.recheckOverflow();
                        if (this.isRunning && this.canAnimate) {
                            this.updateDimensions();
                        }
                    }, this.RESIZE_DELAY);
                });
                this.resizeObserver.observe(this.element);
                this.eventListeners.push(() => this.resizeObserver.disconnect());
            }
        }

        updateDimensions() {
            if (!this.canAnimate) return;
            
            let totalWidth = this.getTotalWidth();
            let containerWidth = this.element.clientWidth;
            let direction = this.config.animation.direction;
            
            if (direction === "left") {
                this.startX = containerWidth;
                this.endX = -totalWidth;
            } else {
                this.startX = -totalWidth;
                this.endX = containerWidth;
            }
            
            let distance = Math.abs(this.endX - this.startX);
            this.duration = (distance / this.config.animation.speed) * 1000;
            
            this.currentX = this.startX;
            this.wrapper.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
        }

        setupVisibilityObserver() {
            this.visibilityObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (this.canAnimate) this.resume();
                    } else {
                        this.pause();
                    }
                });
            }, { root: null, threshold: 0.1 });
            
            this.visibilityObserver.observe(this.element);
            this.eventListeners.push(() => this.visibilityObserver.disconnect());
        }

        pause() {
            if (this.isRunning) {
                this.isRunning = false;
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.animationId = null;
                }
            }
        }

        resume() {
            if (!this.canAnimate) {
                console.log('[Marquee] Resume prevented - content does not overflow');
                return;
            }
            
            if (!this.isRunning && this.wrapper) {
                this.isRunning = true;
                this.startTime = performance.now() - (this.startTime ? (performance.now() - this.startTime) : 0);
                this.animate();
            }
        }

        start() {
            if (!this.shouldAnimate()) {
                this.canAnimate = false;
                console.log('[Marquee] Start prevented - content does not overflow');
                return;
            }
            
            this.canAnimate = true;
            
            if (!this.isRunning) {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
                this.startAnimation();
            }
        }

        stop() {
            if (this.isRunning) {
                this.isRunning = false;
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.animationId = null;
                }
                if (this.wrapper) {
                    this.currentX = 0;
                    this.wrapper.style.transform = `translate3d(0, 0, 0)`;
                }
            }
        }

        update(config) {
            if (config.animation?.speed && config.animation.speed <= 0) {
                console.warn("[Marquee] Animation speed must be greater than 0");
                return;
            }
            
            if (config.animation) {
                this.config.animation = { ...this.config.animation, ...config.animation };
            }
            
            if (config.behavior) {
                this.config.behavior = { ...this.config.behavior, ...config.behavior };
            }
            
            let wasRunning = this.isRunning;
            if (wasRunning) this.pause();
            
            if (this.wrapper) {
                this.wrapper.style.gap = this.getGapValue();
            }
            
            this.updateDimensions();
            this.recheckOverflow();
            
            if (wasRunning && this.canAnimate) this.resume();
        }

        destroy() {
            this.stop();
            if (this.resizeTimer) clearTimeout(this.resizeTimer);
            this.eventListeners.forEach(cleanup => cleanup());
            this.eventListeners = [];
            if (this.wrapper && this.wrapper.parentNode) {
                this.wrapper.parentNode.removeChild(this.wrapper);
            }
        }
    }

    // Make initializeMarquees globally available
    window.initializeMarquees = function() {
        console.log('Initializing marquees...');
        const marquees = document.querySelectorAll("[vitecss-marquee]");
        console.log(`Found ${marquees.length} marquees`);
        marquees.forEach(element => {
            if (!element.vitecssMarquee) {
                let marquee = new ViteCSSMarquee(element);
                element.vitecssMarquee = marquee;
            }
        });
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initializeMarquees);
    } else {
        window.initializeMarquees();
    }

    window.vitecssMarquee = ViteCSSMarquee;
}

// Execute the function
CustomMarquee();


// countdown
// script.js - Advanced Countdown Timer Utility with Full Time Formatting
(function(global) {
    let countdownInterval = null;

    // Advanced time formatting function
    function formatTime(seconds, format = 'auto') {
        const units = {
            year: 31536000,    // 365 days
            month: 2592000,    // 30 days
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };
        
        let remaining = Math.abs(seconds);
        const parts = [];
        
        // Calculate each unit
        const years = Math.floor(remaining / units.year);
        remaining %= units.year;
        
        const months = Math.floor(remaining / units.month);
        remaining %= units.month;
        
        const weeks = Math.floor(remaining / units.week);
        remaining %= units.week;
        
        const days = Math.floor(remaining / units.day);
        remaining %= units.day;
        
        const hours = Math.floor(remaining / units.hour);
        remaining %= units.hour;
        
        const minutes = Math.floor(remaining / units.minute);
        const secs = remaining % units.minute;
        
        // Format based on requested format type
        switch(format) {
            case 'full':
                if (years > 0) parts.push(`${years}y`);
                if (months > 0) parts.push(`${months}mo`);
                if (weeks > 0) parts.push(`${weeks}w`);
                if (days > 0) parts.push(`${days}d`);
                if (hours > 0) parts.push(`${hours}h`);
                if (minutes > 0) parts.push(`${minutes}m`);
                if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
                return parts.join(' ');
                
            case 'verbose':
                if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
                if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
                if (weeks > 0) parts.push(`${weeks} week${weeks !== 1 ? 's' : ''}`);
                if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
                if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
                if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
                if (secs > 0 || parts.length === 0) parts.push(`${secs} second${secs !== 1 ? 's' : ''}`);
                return parts.join(', ');
                
            case 'human':
                if (years > 0) return `${years} year${years !== 1 ? 's' : ''}`;
                if (months > 0) return `${months} month${months !== 1 ? 's' : ''}`;
                if (weeks > 0) return `${weeks} week${weeks !== 1 ? 's' : ''}`;
                if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`;
                if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
                if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
                return `${secs} second${secs !== 1 ? 's' : ''}`;
                
            case 'compact':
                if (years > 0) return `${years}y ${months}mo`;
                if (months > 0) return `${months}mo ${days}d`;
                if (weeks > 0) return `${weeks}w ${days % 7}d`;
                if (days > 0) return `${days}d ${hours}h`;
                if (hours > 0) return `${hours}h ${minutes}m`;
                if (minutes > 0) return `${minutes}m ${secs}s`;
                return `${secs}s`;
                
            case 'datetime':
                return `${years.toString().padStart(4, '0')}-${months.toString().padStart(2, '0')}-${days.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                
            case 'clock':
                const h = hours + (days * 24);
                return `${h.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                
            case 'auto':
            default:
                if (years > 0) return `${years}y ${months}mo ${days}d`;
                if (months > 0) return `${months}mo ${days}d ${hours}h`;
                if (days > 0) return `${days}d ${hours}h ${minutes}m`;
                if (hours > 0) return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                if (minutes > 0) return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                return `${secs}s`;
        }
    }
    
    // Convert date to seconds from now
    function dateToSeconds(targetDate) {
        const now = new Date();
        const target = new Date(targetDate);
        const diffSeconds = Math.floor((target - now) / 1000);
        return diffSeconds;
    }
    
    /**
     * STARTCOUNTDOWN FUNCTION - Complete Usage Guide
     * 
     * param {number|string|Date} time - Can be:
     *    - Number: seconds (e.g., 60, 3600, 86400)
     *    - String: date string (e.g., "2025-12-25", "2025-01-01T00:00:00")
     *    - Date object: (e.g., new Date("2025-12-25"))
     * 
     * param {Object} options - Optional configuration object
     *    - displayElement: (HTMLElement) Element to show timer. Default: document.getElementById("timer-display")
     *    - format: (string) Display format. Options: 'auto', 'full', 'verbose', 'human', 'compact', 'datetime', 'clock'
     *    - showMilliseconds: (boolean) Show milliseconds. Default: false
     *    - onTick: (function) Callback every second. Receives (remainingSeconds, formattedTime, verboseTime)
     *    - onComplete: (function) Callback when timer ends
     *    - alert: (boolean) Show alert on completion. Default: true
     * 
     * returns {boolean} - Returns true if timer started successfully
     * 
     * ============ HOW TO USE ============
     * 
     * 1. BASIC USAGE:
     *    startCountdown(60);  // Countdown 60 seconds
     * 
     * 2. WITH CUSTOM DISPLAY ELEMENT:
     *    startCountdown(120, { displayElement: document.getElementById("my-timer") });
     * 
     * 3. DIFFERENT FORMATS:
     *    startCountdown(3661, { format: 'clock' });        // 01:01:01
     *    startCountdown(90061, { format: 'full' });        // 1d 1h 1m 1s
     *    startCountdown(90061, { format: 'verbose' });     // 1 day, 1 hour, 1 minute, 1 second
     *    startCountdown(90061, { format: 'human' });       // 1 day
     *    startCountdown(90061, { format: 'compact' });     // 1d 1h
     *    startCountdown(3661, { format: 'datetime' });     // 0000-00-00 01:01:01
     * 
     * 4. COUNTDOWN TO DATE:
     *    startCountdown("2025-12-25");                     // Christmas countdown
     *    startCountdown("2025-01-01T00:00:00");
     *    startCountdown(new Date("2025-12-25"));
     * 
     * 5. WITH CALLBACKS:
     *    startCountdown(10, {
     *        onTick: (seconds, formatted, verbose) => {
     *            console.log(`Time left: ${formatted}`);
     *        },
     *        onComplete: () => {
     *            console.log("Timer finished!");
     *        }
     *    });
     * 
     * 6. WITH MILLISECONDS (ultra precise):
     *    startCountdown(5, { 
     *        format: 'clock',
     *        showMilliseconds: true 
     *    });
     * 
     * 7. WITHOUT ALERT:
     *    startCountdown(30, { alert: false });
     * 
     * 8. STOP TIMER:
     *    stopCountdown();
     * 
     * 9. GET REMAINING TIME (debug):
     *    getRemainingTime();
     * 
     * ============ EXAMPLES ============
     * 
     * // Example 1: Simple 1 minute timer
     * startCountdown(60);
     * 
     * // Example 2: Countdown to New Year with verbose format
     * startCountdown("2026-01-01", {
     *     format: 'verbose',
     *     onComplete: () => console.log("Happy New Year! 🎉")
     * });
     * 
     * // Example 3: 24-hour countdown with clock format
     * startCountdown(86400, { format: 'clock' });
     * 
     * // Example 4: Birthday countdown with custom element
     * const birthdayDisplay = document.getElementById("birthday-timer");
     * startCountdown("2025-06-15", {
     *     displayElement: birthdayDisplay,
     *     format: 'human',
     *     onComplete: () => alert("Happy Birthday! 🎂")
     * });
     * 
     */
    function startCountdown(time, options = {}) {
        // Clear any existing timer
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        
        let remainingTime;
        
        // Handle different input types
        if (typeof time === 'string') {
            // Check if it's a date string
            if (!isNaN(Date.parse(time))) {
                remainingTime = dateToSeconds(time);
            } else {
                console.error("Invalid date string provided");
                return false;
            }
        } else if (typeof time === 'number') {
            remainingTime = time;
        } else if (time instanceof Date) {
            remainingTime = dateToSeconds(time);
        } else {
            console.error("Please provide a number (seconds), Date object, or date string");
            return false;
        }
        
        // Validate input
        if (isNaN(remainingTime) || remainingTime <= 0) {
            console.error("Please provide a positive number of seconds or future date");
            return false;
        }
        
        // Get display element
        const timerDisplay = options.displayElement || document.getElementById("timer-display");
        if (!timerDisplay) {
            console.error("Timer display element not found");
            return false;
        }
        
        // Format options
        const format = options.format || 'auto';
        const showMilliseconds = options.showMilliseconds || false;
        
        // Callbacks
        const onTick = options.onTick || null;
        const onComplete = options.onComplete || null;
        
        // Display the starting time
        timerDisplay.textContent = formatTime(remainingTime, format);
        
        let lastTimestamp = Date.now();
        
        // Start the countdown
        countdownInterval = setInterval(() => {
            remainingTime--;
            
            if (remainingTime >= 0) {
                let displayTime = remainingTime;
                let formattedTime = formatTime(displayTime, format);
                
                // Add milliseconds if requested
                if (showMilliseconds) {
                    const now = Date.now();
                    const milliseconds = 999 - (now - lastTimestamp);
                    lastTimestamp = now;
                    formattedTime = `${formattedTime}.${Math.floor(milliseconds).toString().padStart(3, '0')}`;
                }
                
                timerDisplay.textContent = formattedTime;
                if (onTick) onTick(remainingTime, formattedTime, formatTime(remainingTime, 'verbose'));
            } else {
                // Timer finished
                clearInterval(countdownInterval);
                countdownInterval = null;
                timerDisplay.textContent = formatTime(0, format);
                
                if (onComplete) {
                    onComplete();
                } else {
                    console.log("Time's up!");
                    if (options.alert !== false) alert("Time's up!");
                }
            }
        }, showMilliseconds ? 10 : 1000);
        
        return true;
    }
    
    // Stop the countdown
    function stopCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            console.log("Timer stopped");
            return true;
        }
        console.log("No active timer to stop");
        return false;
    }
    
    // Get remaining time without displaying
    function getRemainingTime() {
        return countdownInterval ? 'Timer running' : 'No active timer';
    }
    
    // Expose to global scope
    global.startCountdown = startCountdown;
    global.stopCountdown = stopCountdown;
    global.formatTime = formatTime;
    global.getRemainingTime = getRemainingTime;
    
})(window);



function SpaLoader(element){
    // spa loader to be updated nased on script
    let loader=` <div class="spa-loader">
 <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle></svg>
      </div>
`;
    element.innerHTML=loader;
}

   
function IsJSONABLE(data){
    try{
      JSON.parse(data);
      return true;
    }catch{
        return false;
    }
}

// mask-input.js - Reusable utility for vitecss-type="password" inputs

class PasswordMaskUtility {
  constructor() {
    this.inputs = new Map(); // Track each input's state
    this.init();
  }
  
  // Initialize all inputs with vitecss-type="password"
  init() {
    const elements = document.querySelectorAll('input[vitecss-type="password"]');
    elements.forEach(input => this.setupInput(input));
    
    // Watch for dynamically added inputs
    this.observeNewInputs();
  }
  
  // Setup individual input
  setupInput(input) {
    // Skip if already set up
    if (input._maskSetup) return;
    
    const state = {
      realValue: '',
      isMasked: true
    };
    
    input._maskState = state;
    input._maskSetup = true;
    
    // Set attributes
    input.setAttribute('vitecss-value', '');
    input.type = 'text'; // Ensure type is text
    
    // Store methods on input for external access
    input.getRealValue = () => state.realValue;
    input.setRealValue = (val) => {
      state.realValue = val || '';
      if (state.isMasked) {
        input.value = '•'.repeat(state.realValue.length);
      } else {
        input.value = state.realValue;
      }
      input.setAttribute('vitecss-value', state.realValue);
    };
    
    input.toggleMasking = () => {
      state.isMasked = !state.isMasked;
      if (state.isMasked) {
        input.value = '•'.repeat(state.realValue.length);
      } else {
        input.value = state.realValue;
      }
      return state.isMasked;
    };
    
    // Handle beforeinput - prevent showing actual characters
    input.addEventListener('beforeinput', (e) => {
      // Store the current real value length before input
      state._beforeLength = state.realValue.length;
    });
    
    // Handle input events (typing, paste, suggestions)
    input.addEventListener('input', (e) => {
      // Get what was typed/pasted
      const inputType = e.inputType;
      const data = e.data;
      
      // Handle different input types
      if (inputType === 'insertText' && data) {
        // Single character or multiple characters from suggestion
        if (data.length === 1) {
          // Single character typed
          state.realValue += data;
        } else {
          // Multiple characters (keyboard suggestion)
          state.realValue += data;
        }
      } else if (inputType === 'insertFromPaste') {
        // Paste event - get from clipboard
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        state.realValue += pastedText;
      } else if (inputType === 'deleteContentBackward') {
        // Backspace
        state.realValue = state.realValue.slice(0, -1);
      } else if (inputType === 'deleteContentForward') {
        // Delete
        const cursorPos = input.selectionStart;
        const bulletCount = input.value.length;
        const charIndex = Math.floor(cursorPos);
        if (charIndex < state.realValue.length) {
          state.realValue = state.realValue.slice(0, charIndex) + state.realValue.slice(charIndex + 1);
        }
      } else if (inputType === 'insertReplacementText') {
        // Keyboard auto-suggestion
        if (data) {
          state.realValue += data;
        }
      }
      
      // Immediately update display with bullets
      input.value = '•'.repeat(state.realValue.length);
      
      // Update vitecss-value attribute
      input.setAttribute('vitecss-value', state.realValue);
      
      // Keep cursor at the end
      this.keepCursorAtEnd(input);
    });
    
    // Handle paste separately to ensure it works
    input.addEventListener('paste', (e) => {
      // Prevent default to avoid double handling
      e.preventDefault();
      
      // Get pasted text
      const pastedText = (e.clipboardData || window.clipboardData).getData('text');
      
      // Add to real value
      state.realValue += pastedText;
      
      // Update display with bullets
      input.value = '•'.repeat(state.realValue.length);
      
      // Update attribute
      input.setAttribute('vitecss-value', state.realValue);
      
      // Keep cursor at the end
      this.keepCursorAtEnd(input);
    });
    
    // Handle keydown for backspace/delete to ensure they work
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        state.realValue = state.realValue.slice(0, -1);
        input.value = '•'.repeat(state.realValue.length);
        input.setAttribute('vitecss-value', state.realValue);
        this.keepCursorAtEnd(input);
      } else if (e.key === 'Delete') {
        e.preventDefault();
        const cursorPos = input.selectionStart;
        const bulletCount = input.value.length;
        if (cursorPos < state.realValue.length) {
          state.realValue = state.realValue.slice(0, cursorPos) + state.realValue.slice(cursorPos + 1);
          input.value = '•'.repeat(state.realValue.length);
          input.setAttribute('vitecss-value', state.realValue);
          input.setSelectionRange(cursorPos, cursorPos);
        }
      }
    });
    
    input.addEventListener('click', () => this.keepCursorAtEnd(input));
    
    // Initialize
    input.value = '';
    input.setAttribute('vitecss-value', '');
    
    return input;
  }
  
  // Keep cursor at the end of input
  keepCursorAtEnd(input) {
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }
  
  // Watch for dynamically added inputs
  observeNewInputs() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            if (node.matches && node.matches('input[vitecss-type="password"]')) {
              this.setupInput(node);
            }
            if (node.querySelectorAll) {
              const children = node.querySelectorAll('input[vitecss-type="password"]');
              children.forEach(child => this.setupInput(child));
            }
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  // Get all masked inputs
  getAllMaskedInputs() {
    return document.querySelectorAll('input[vitecss-type="password"]');
  }
}

// Initialize when DOM is ready
let maskUtility = null;

// Auto-initialize function
function initPasswordMask() {
  if (!maskUtility) {
    maskUtility = new PasswordMaskUtility();
  }
  return maskUtility;
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PasswordMaskUtility, initPasswordMask };
} else if (typeof window !== 'undefined') {
  window.PasswordMaskUtility = PasswordMaskUtility;
  window.initPasswordMask = initPasswordMask;
}

// post request
async function PostRequest(event,element,callback=null,notify=null,btn_text=null){
  try{
      event.preventDefault();
 let inputs=element.querySelectorAll('.inp.required');
 
 
 let isEmpty = false;

 if(inputs){
    
    
    inputs.forEach((input)=>{
         let cont=input.closest('.cont');
        //  FIRST REMOVE EMPTY STATE
         if(cont){
         
        
            cont.classList.remove('empty');
           
           }else{
          
             input.classList.remove('empty');
            
           }
        //    CHECK FOR EMPTY INPUTS THAT ARE REQUIRED

        if(input.value.trim() == ''){
            isEmpty=true;
          
           
        if(cont){
            cont.classList.add('empty');
            
        }else{
              input.classList.add('empty');
        }
        }

    });
 }
 
 if(!isEmpty){
    // loading state
   let post_btn=element.querySelector('button');
   if(post_btn){
    let data_text=post_btn.dataset.text;
    if(!data_text){
        post_btn.dataset.text=post_btn.innerHTML;
    }
     post_btn.classList.toggle('disabled');
     post_btn.innerHTML=btn_text ?? 'Processing...';
   }


    let inps=element.querySelectorAll('.input');
    let form=new FormData();
    let val;
   
    inps.forEach((inp)=>{
        val=inp.value;
        if(inp.hasAttribute('vitecss-value')){
            val=inp.getAttribute('vitecss-value');
        }
       form.append(inp.name,val);

    });
    // check for photos
    let files=element.querySelectorAll('input[type=file]');
    if(files){
        files.forEach((inp)=>{
            let file=inp.files[0];
            if(file){
                form.append(inp.name,file);
            }
        })
    }

    
    let response=await fetch(element.action,{
        method : 'POST',
        body : form
     });
     
     if(response.ok){
        let data=await response.text();
        
        if(IsJSONABLE(data)){
            let json=JSON.parse(data);
            if(notify == null){
            CreateNotify(json.status,json.message);

            }
        }else{
            CreateNotify('error',data);
        }
        if(callback !== null){
            callback(data,event);
        }
       if(post_btn){
         post_btn.innerHTML=post_btn.dataset.text;
        post_btn.classList.toggle('disabled');
       }
     }else{
        if(post_btn){
         post_btn.innerHTML=post_btn.dataset.text;
        post_btn.classList.toggle('disabled');
       }
        CreateNotify('error','Internal Error: ' + response.status + ' Error');
        if(response.status == 419){
        window.location.reload();
    }
        
     }
     
 }
  }catch(error){
    CreateNotify('error',error);
    element.querySelector('button').classList.remove('active');
    
  }
}



// create notify
function CreateNotify(status,message){
    let notifies=document.querySelectorAll('.notify');
    if(notifies){
        notifies.forEach((notify)=>{
            notify.remove();
        })
    }
  let section=document.createElement('section');
  section.classList.add('notify');
  section.classList.add(status);
  let icon=status == 'success' ? '<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>' : (status == 'error' ? '<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>' : '<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"></path></svg>');


  section.innerHTML=` <div class="row g-5 w-full p-5 notify-body space-between align-center">
           <i class="notify-symbol">${icon}</i>
             <div class="column m-right-auto g-5">
              <strong style="text-transform:capitalize;font-weight:800" class="font-weight-800 notify-status">
            ${status}
        </strong>
            <div class="message">
            ${message}
        </div>
             </div>
        <div onclick="HideNotify()" class="pc-pointer m-bottom-auto no-select" style="font-size:2rem">
<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
        </div>
        </div>`;
       
       
       
       
        document.body.appendChild(section);
        let RemoveNotify=setTimeout(()=>{
            section.remove();
        },5000);
    
}
function HideNotify(){
  let notify= document.querySelector('.notify');
    if(notify){
     notify.remove();
    }
}

// SEND GET REQUEST

/**
 * GetRequest - Perform an asynchronous GET request with optional query parameters
 * 
 * param {string} url - The endpoint URL (can include existing query parameters)
 * param {Object|null} getData - Optional object containing key-value pairs to append as query parameters
 * param {Function|null} callback - Optional callback function (data, error) => void
 * returns {Promise<string>} - Returns the response text
 * 
 * example
 * // Simple GET request
 * const data = await SendGetRequest('https://api.example.com/users');
 * 
 * example
 * // GET with query parameters
 * const data = await SendGetRequest('https://api.example.com/users', {
 *     id: 123,
 *     sort: 'asc',
 *     limit: 10
 * });
 * // Result URL: https://api.example.com/users?id=123&sort=asc&limit=10
 * 
 * example
 * // GET with existing URL parameters
 * const data = await SendGetRequest('https://api.example.com/users?active=true', {
 *     sort: 'desc'
 * });
 * // Result URL: https://api.example.com/users?active=true&sort=desc
 * 
 * example
 * // Using callback pattern
 * SendGetRequest('https://api.example.com/data', { page: 2 }, (data, error) => {
 *     if (error) {
 *         console.error('Error:', error);
 *     } else {
 *         console.log('Data:', data);
 *     }
 * });
 */
async function SendGetRequest(url, getData = null, callback = null) {
    try {
        // If data is provided, append it to URL as query parameters
        if (getData) {
            const queryString = new URLSearchParams(getData).toString();
            url = url + (url.includes('?') ? '&' : '?') + queryString;
        }
        
        let response = await fetch(url, {
            method: 'GET'
        });
        
        let data = await response.text();
        
        if (callback) {
            callback(data, response.ok ? null : 'Error: ' + response.status);
        }
        
        return data;
    } catch (error) {
        if (callback) callback(null, error.message);
        throw error;
    }
}
// SEND POST REQUEST
/**
 * Perform an asynchronous POST request with FormData
 * 
 * param {string} url - The endpoint URL
 * param {Object} postData - Object containing key-value pairs to send as FormData
 * param {Function|null} [callback=null] - Optional callback function (data, error) => void
 * returns {Promise<string>} - Returns the response text
 * 
 * example
 * // Simple POST request
 * const data = await SendPostRequest('https://api.example.com/users', {
 *     name: 'John Doe',
 *     email: 'john@\example.com',
 *     age: 30
 * });
 * 
 * example
 * // POST with file upload
 * const fileInput = document.getElementById('fileInput');
 * const data = await SendPostRequest('https://api.example.com/upload', {
 *     file: fileInput.files[0],
 *     description: 'Profile picture'
 * });
 * 
 * example
 * // Using callback pattern
 * SendPostRequest('https://api.example.com/submit', { data: 'value' }, (data, error) => {
 *     if (error) {
 *         console.error('Error:', error);
 *     } else {
 *         console.log('Response:', data);
 *     }
 * });
 */
async function SendPostRequest(url, postData, callback = null) {
    try {
        let form = new FormData();
        Object.keys(postData).forEach(key => form.append(key, postData[key]));
        
        let response = await fetch(url, {
            method: 'POST',
            body: form
        });
        
        let data = await response.text();
        
        if (callback) {
            callback(data, response.ok ? null : 'Error: ' + response.status);
        }
    } catch (error) {
        if (callback) callback(null, error.message);
    }
}

// copy
async function copy(data) {
    // Helper function for fallback copy (works on older iOS)
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        textarea.select();
        textarea.setSelectionRange(0, text.length);
        
        let success = false;
        
            success = document.execCommand('copy');
        
        
        document.body.removeChild(textarea);
        return success;
    }
    
   
        // Try modern Clipboard API first (newer iPhones iOS 13.4+)
        if (navigator.clipboard && window.isSecureContext && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(data);
            CreateNotify('success', 'Copied successfully');
        } 
        // Fallback for older iPhones (iOS 9-13.3)
        else {
            const success = fallbackCopy(data);
            if (success) {
                CreateNotify('success', 'Copied successfully');
            }
        }
    
}

// stop propagation
function StopPropagation(event){
    event.stopPropagation();
}

// preview photo
function PreviewPhoto(element, label) {
    let file = element.files[0];
    
    // Remove any existing preview image
    const existingImg = label.querySelector('img[vitecss-photo-preview]');
    if (existingImg) existingImg.remove();
    
    const children = Array.from(label.children);
    
    if (file) {
        // Hide all children with d-none class
        children.forEach(child => {
            child.classList.add('d-none');
        });
        
        let img = document.createElement('img');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.pointerEvents = 'none';
        img.setAttribute('vitecss-photo-preview', 'true');
        img.src = URL.createObjectURL(file);
        
        label.appendChild(img);
    } else {
        // Show all children by removing d-none class
        children.forEach(child => {
            child.classList.remove('d-none');
        });
    }
}
// hide loading
function HideLoading(){
    let loading=document.querySelector(".loading-state");
    if(loading){
        
        loading.remove()
        
    }
        
   

}
// set vh
function SetWindowHeight(){
     let height=window.innerHeight;
    if(window.visualViewport){
        height=window.visualViewport.height;
    }
   
    document.body.style.minHeight=height + 'px';
}



// Store cleanup functions for body-related items only
window._bodyCleanupFunctions = [];

// Register body-specific cleanup
function registerBodyCleanup(cleanupFn) {
    window._bodyCleanupFunctions.push(cleanupFn);
}

// Clean only body-related items before navigation
function cleanupBodyBeforeNavigate() {
    window._bodyCleanupFunctions.forEach(fn => {
        try {
            fn();
        } catch(e) {
            console.error('Body cleanup error:', e);
        }
    });
    window._bodyCleanupFunctions = [];
}

/**
 * SPA ENGINE WITH AUTOMATIC LIFECYCLE CLEANUP
 * -------------------------------------------
 * This script patches global browser functions to track and 
 * automatically remove listeners and timers between page loads.
 */

// 1. REGISTRY: Tracks all active page-level background processes
window.spaRegistry = {
    intervals: new Set(),
    timeouts: new Set(),
    listeners: [],

    // The "Nuke" function to wipe the slate clean
    cleanup() {
        // Clear all tracked intervals
        this.intervals.forEach(id => clearInterval(id));
        this.intervals.clear();

        // Clear all tracked timeouts
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts.clear();

        // Remove all tracked event listeners
        this.listeners.forEach(({ target, type, fn, options }) => {
            target.removeEventListener(type, fn, options);
        });
        this.listeners = [];
        
        console.log("SPA: Cleanup complete. Intervals, timeouts, and listeners cleared.");
    }
};

// 2. MONKEY PATCHING: Intercept globals to auto-register them
const nativeInterval = window.setInterval;
const nativeTimeout = window.setTimeout;
const nativeAddListener = window.addEventListener;

window.setInterval = (fn, delay) => {
    const id = nativeInterval(fn, delay);
    window.spaRegistry.intervals.add(id);
    return id;
};

window.setTimeout = (fn, delay) => {
    const id = nativeTimeout(fn, delay);
    window.spaRegistry.timeouts.add(id);
    return id;
};

window.addEventListener = function(type, fn, options) {
    // We track listeners on window and document as they cause the most "leaks"
    if (this === window || this === document) {
        window.spaRegistry.listeners.push({ target: this, type, fn, options });
    }
    nativeAddListener.call(this, type, fn, options);
};



     function trickleLoader(element, options = {}) {
    const {
        onComplete = null, // callback when done
            startPercent = 0,
            endPercent = 80,
            showLabel = true, // show percentage text
            fastZone = 30,
            mediumZone = 60,
            slowZone = 80,
    } = options;
    
    let progress = startPercent;
    let running = false;
    let timer = null;
    
    // Create internal elements if needed
    const bar = element.querySelector('.progress-bar') || element;
    const label = element.querySelector('.progress-label') || null;
    
    function getIncrement() {
        const p = progress;
        if (p < fastZone) return 5 + Math.random() * 8;
        if (p < mediumZone) return 2 + Math.random() * 4;
        if (p < slowZone) return 0.5 + Math.random() * 1.5;
        return 0.1 + Math.random() * 0.3;
    }
    
    function getDelay() {
        const p = progress;
        if (p < fastZone) return 60 + Math.random() * 60;
        if (p < mediumZone) return 100 + Math.random() * 100;
        if (p < slowZone) return 200 + Math.random() * 200;
        return 300 + Math.random() * 400;
    }
    
    function updateUI(value) {
        const pct = Math.round(value);
        
        // Update bar
        if (bar.style) {
            bar.style.width = pct + '%';
        }
        
        // Update label
        if (showLabel) {
            if (label) {
                label.textContent = pct + '%';
            } else if (element.tagName === 'DIV' && !element.classList.contains('progress-bar')) {
                // If element is a container, add label
                let lbl = element.querySelector('.progress-label');
                if (!lbl) {
                    lbl = document.createElement('span');
                    lbl.className = 'progress-label';
                    element.appendChild(lbl);
                }
                lbl.textContent = pct + '%';
            }
        }
    }
    
    function step() {
        if (!running) return;
        
        progress += getIncrement();
        progress = Math.min(progress, endPercent);
        
        updateUI(progress);
        
        if (progress < endPercent) {
            timer = setTimeout(step, getDelay());
        }
    }
    
    function start() {
        if (running) return;
        running = true;
        step();
        return api;
    }
    
    function complete() {
        running = false;
        if (timer) clearTimeout(timer);
        progress = 100;
        updateUI(100);
        if (onComplete) onComplete();
        return api;
    }
    
    function stop() {
        running = false;
        if (timer) clearTimeout(timer);
        return api;
    }
    
    function getProgress() {
        return Math.round(progress);
    }
    
    function setProgress(value) {
        progress = Math.min(value, 99);
        updateUI(progress);
        return api;
    }
    
    const api = { start, complete, stop, getProgress, setProgress };
    
    // Auto-start if requested
    if (options.autoStart) {
        start();
    }
    
    return api;
}


// 3. THE SPA FUNCTION: Handles navigation and surgical DOM updates
async function spa(url) {
    // Start Loading UI
    let bar = document.createElement('div');
    bar.classList.add('vite-loader');
    document.body.appendChild(bar);
    let loader_child=document.createElement('div');
   loader_child.classList.add('child');
    bar.appendChild(loader_child)
    let loader=trickleLoader(document.querySelector('.vite-loader .child'));
    loader.start();

    try {
        // Fire Start Events
        document.dispatchEvent(new Event('vitecss:navigate'));

        // Fetch new content
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response failed');
        
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
    
        // --- THE CLEANUP PHASE ---
        window.spaRegistry.cleanup();

        // --- THE UPDATE PHASE ---
        loader_child.style.transition='all 0.2s ease';
        loader.complete();

        await new Promise(r => setTimeout(r, 200));
        // Update Title
        document.title = doc.title;

        // Update Styles (Remove old .css styles, inject new ones)
        document.querySelectorAll('head style.css').forEach(s => s.remove());
        doc.querySelectorAll('head style.css').forEach(style => {
            const newStyle = document.createElement('style');
            newStyle.className = 'css';
            newStyle.textContent = style.textContent;
            document.head.appendChild(newStyle);
        });

        // Update Styles - Link tags with .css class pattern (lowercase)
// Remove old .css link tags
document.querySelectorAll('head link.css').forEach(link => link.remove());

// Inject new link tags from response
doc.querySelectorAll('head link.css').forEach(link => {
    const newLink = document.createElement('link');
    newLink.className = 'css';
    newLink.rel = link.rel || 'stylesheet';
    newLink.href = link.href;
    newLink.media = link.media || 'all';
    // Copy any other attributes (integrity, crossorigin, etc.)
    if (link.integrity) newLink.integrity = link.integrity;
    if (link.crossOrigin) newLink.crossOrigin = link.crossOrigin;
    document.head.appendChild(newLink);
});

        // Update Body Content
        document.body.innerHTML = doc.body.innerHTML;

        // Push to History
        history.pushState({ url }, doc.title, url);

        // --- THE RE-ACTIVATION PHASE ---
        
        // Find and re-execute scripts in the new body
        // (Native innerHTML injection doesn't execute <script> tags)
        document.body.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // Copy all attributes (src, type, etc.)
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // Copy script content
            newScript.textContent = oldScript.textContent;
            
            // Replace to trigger execution
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });

        // Fire Success Event
        document.dispatchEvent(new Event('vitecss:navigated'));

    } catch (error) {
        console.error('SPA Error:', error);
        document.dispatchEvent(new Event('vitecss:navigate-error'));
         window.location.href=url;
    } finally {
        // Remove Loading UI
        if (loader){
          loader.stop();
        }
       
    }
}

// 4. BROWSER BACK/FORWARD SUPPORT
window.onpopstate = function(event) {
    if (event.state && event.state.url) {
        spa(event.state.url);
    }
};

// Vitecss
window.Vitecss = {
    navigate : (url)=>{
        spa(url)
    }
}
// toggle nav group
function ToggleNavGroup(element){
    let group=element.closest('.group');
    if(group.classList.contains('active')){
 group.classList.remove('active');
    }else{
         group.classList.add('active');
    }
   
}
// toggle nav
function ToggleNav(){
    document.querySelector('nav').classList.add('active');
}
// Hide nav
function HideNav(){
    document.querySelector('nav').classList.remove('active');
}
// auto fill
function AutoFill(val,input,element){
   // alert(10)
   input.value=val;
   if(element !== null){
    element.classList.add('active');
   }


}
// calling functions
function GeneralStyles(){
    if(document.querySelector('.loading-state')){
        document.querySelector('.loading-state').remove();
    }
      
}
// loaded
function Loaded(){
    document.querySelectorAll('[data-onload]').forEach((data)=>{
        let element=data;
        eval(data.getAttribute('data-onload'));
    });
}
// remove empty class from inputs and conts

function UnEmpty(){
    let inps=document.querySelectorAll('.inp.required');
    if(inps){
        inps.forEach((inp)=>{
           inp.addEventListener('focus',()=>{
             let cont=inp.closest('.cont');
            if(cont){
                cont.classList.remove('empty');
            }else{
                inp.classList.remove('empty');
            }
           })
        })
    }
}
// number Format
function FormatNumber(number,fraction_digits=0){
let formatter=new Intl.NumberFormat('en-US',{
    minimumFractionDigits : fraction_digits,
    maximumFractionDigits : fraction_digits
});
return formatter.format(number);
}


window.addEventListener('load',()=>{
    
    GeneralStyles();
    SetWindowHeight();
    Loaded();
    CustomMarquee();
    initPasswordMask();
    UnEmpty();
    
});




// vitecss navigated
document.addEventListener('vitecss:navigated',()=>{
    GeneralStyles();
    SetWindowHeight();
    UnEmpty();
    Loaded();
    CustomMarquee();
    initPasswordMask();

});

 
 

