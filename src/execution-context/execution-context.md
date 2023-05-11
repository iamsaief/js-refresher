- [JavaScript Execution Context - Hoisting, Scope, Closure](#javascript-execution-context---hoisting-scope-closure)
  - [Execution Context Definition](#execution-context-definition)
  - [1. `Global Execution Context`](#1-global-execution-context)
    - [Understanding Hoisting](#understanding-hoisting)
  - [2. `Function Execution Context`](#2-function-execution-context)
    - [Execution Stack for nested functions | Discover Hoisting](#execution-stack-for-nested-functions--discover-hoisting)
    - [Discover Lexical Scope](#discover-lexical-scope)
    - [Discover Closure](#discover-closure)

# JavaScript Execution Context - Hoisting, Scope, Closure

এক্সিকিউশন কনট্যাক্স বুঝতে হলে শুরুতেই বুঝতে হলে জাভাস্ক্রিপ্ট কিভাবে কোড থেকে কিভাবে আউটপুট দেয়।

`JS Code` => `Browser/Runtime Environment` => `JS Engin` => `Computer` => `Output`

জাভাস্ক্রিপ্ট কোড ব্রউজার বা যেকোন রানটাইম এনভায়রোনম্যান্টেই (নোড জেএস) চলতে। যেখানেই চলুক না কেনো এখানে একটা জেএস ইঞ্জিন থাকে। যেমন সবচেয়ে ফাস্ট হল ক্রোমের V8 Engin যেটা নোড জেএস ব্যাবহার করে রানটাইম এনভায়রোনম্যান্ট বানিয়েছে। আরো কিছু জনপ্রিয় ব্রউজারগুলতে যে ইঞ্জিন ব্যাবহার হচ্ছে যেমন ফায়ারফক্স ব্যাবহার করে Spider Monkey, ইন্টারনেট এক্সপ্লোরার ব্যাবহার করে Chakra, সাফারি ব্যাহভার করে JS Core ইত্যাদি। এই ইঞ্জিনগুলোর কাজ একটাই সেটা হল জেএস কোডকে ম্যাশিন কোডে রূপান্তর করা। এই ম্যাশিন কোড কম্পিউটার বুঝতে পারে আর সে অনুযায়ি আউটপুট প্রোদর্শন করে।

৯০ এর দশকে জাভাস্ক্রিপ্ট ছিল কেবলই ইন্টারপ্রিটেট ল্যাংগুয়েজ কোন কম্পাইলারের প্রয়োজন তখনও ছিল না। কিন্তু বর্তমানে জাভাস্ক্রিপ্ট বহুল ব্যাবহার হচ্ছে। জাভাস্ক্রিপ্ট দিয়ে এপ্লিকাশন ডেভেলপ করার জন্য এই ইঞ্জিন কিভাবে কাজ করে সেটা জানাটাই আমাদের জন্য জরুরি। ইঞ্জিন জাভাস্ক্রিপ্ট রান করানোর জন্য ৩টি উপায় রয়েছে। এরা হল-

    ১। ইন্টারপ্রিটেশন
    ২। কম্পাইলেশন
    ৩। এই দুটার সমন্বয় করে (বর্তমান জাভাস্ক্রিপ্ট)

১। `ইন্টারপ্রিটেশন` (ধীর গতির কিন্তু সহজে ডিবাগ করা যায়)

এক্ষেত্রে প্রতীটি লাইন ইন্সট্রাকশনের জন্য সেটার ম্যাশিন ইকুইভেলেন্ট ইন্সট্রাকশনের আগেই সেট করা থাকে। তাই লাইন বাই লাইন কোড এক্সিকিউট হয়ে ম্যাশিন ল্যাঙ্গুয়েজে কনভার্ট হয় খুব ধীর গতিতে। কিন্তু এজন্য ডিবাগ করা সহজ হয়।

২। `কম্পাইলেশন` (দ্রুত গতির কিন্তু সহজে ডিবাগ করা যায় না)

এক্ষেত্রে প্রতীটি লাইন ইন্সট্রাকশন এক্সিকিউট না করে পুরো কোডকে একবারেই ম্যাশিন ল্যাঙ্গুয়েজে কনভার্ট করা হয়। এজন্য প্রোসেসিং হয় খুব দ্রুত গতিতে। আর মেমোরি লিক বা মেলিশাস কোড রান হয়ে যাওয়ায় সিস্টেম ক্রাশ করতে পারে। ফলে এজন্য ডিবাগ করা কঠিন হয়।

৩। `এই দুটার সমন্বয় করে` (বর্তমান জাভাস্ক্রিপ্ট)

ইন্টারপ্রিটার আর কম্পাইলার দুটোরই কিছু সুবিধা-অসুবিধা আছে। কিন্তু দুটোর সুবিধা কজে লাগিয়ে এদের সমন্বয় করে একটা ইঞ্জিন বানানোর চিন্তা থেকেই ২০০৮ সালে গুগোল ক্রোম ভি৮ ইঞ্জিন বাজারে নিয়ে আসে। এটা ইন্টারপ্রিটরের ইজি ডিবাগ আর কম্পাইলারের দ্রুর প্রসেস সমন্বয় করে কাজ করে এমন কম্পাইলার যাকে বলা হয় জাস্ট-ইন-টাইম(জেআইটি) কম্পাইলার।
জেআইটি কম্পাইলার - এটা মুল কোডকে যেরকম আছে সেরকমই রাখে কিন্তু যখনই কোন ইন্সট্রাকশন কল হয় তখনই জাস্ট-ইন-টাইম কম্পাইল করে কোড এক্সিকিউট করে আউইপুট দিয়ে দেয় আর যদি ইরর হয় সেটি দেখিয়ে দেয়। ফলে প্রসেস হয় ফাস্ট আর ডিবাগ হয়ে যায় ইজি।

## Execution Context Definition

কোড করার একটা স্ট্রেটিজি প্রোগ্রামাররা ফলো করে - মুল প্রব্লেমকে ছোট ছোট অংশে ভাগ করে ফেলা। এগুলোকে ফংশন, মডিউল, প্যাকেজ বলা হয়ে থাকে। যেটাই বলা হোক না কেন এদের মুল উদ্দেশ্য হচ্ছে কোডকে ছোট অংশে ভেঙ্গে ফেলা যাতে করে এটা ম্যানটেইন করা সহজ হয় আর কমপ্লেক্সিটি কমিয়ে আনা যায়।

জাভাস্ক্রিপ্ট ইঞ্জিন কোডের ইন্টারপ্রিটেশনকে সহজ করার জন্য এইকই কাজ করে। আর তখনই এই ছোট ছোট অংশকে বলা হয় এক্সিকিউশন কনট্যাক্স (একদম সহজ সাধারন ভাবে যদি বলা হয় আরকি)। এটাও জাভাস্ক্রিপ্টের একটা অবজেক্ট, একটা কন্টেইনারের সাথে তুলনা করা যেতে পারে।

এক্সিকিউশন কনট্যাক্স হয় মূলত ২ রকম -

    ১। Global Execution Context
    ২। Function Execution Context

প্রীতিটি এক্সিকিউশন কনট্যাক্স এর ২টি ধাপ থাকে -

    ১। Loading/Creation
    ২। Execution

এখন দেখি এক্সিকিউশন কনট্যাক্সে কি কি থাকে -

| Global Execution Context             | Function Execution Context           |
| ------------------------------------ | ------------------------------------ |
| `Phase`: Loading/Creation, Execution | `Phase`: Loading/Creation, Execution |
| `Window`: global object              | `Parameter/Agruments`: object        |
| `This`: window                       | `This`: window                       |
| `Variable object`                    | `Variable object`                    |
| `Scope chain`                        | `Scope chain`                        |
|                                      |                                      |

## 1. `Global Execution Context`

কোড রান হওয়ার শুরুতেই কিন্তু কোন কোড রান হয়ে যাবে না, ওয়েবসাইটে আমরা যেমন লোডিং দেখি, সেরকমই একটা স্টেট থেকে গ্লোবাল এক্সিকিউশন কন্টেক্স তৈরি হয় এই ফেজটাকে বলা হচ্ছে লোডিং/ক্রিয়েশন। এই স্টেটে গ্লোবাল এক্সিকিউশন অবজেক্টে থাকবে উইন্ডো- গ্লোবাল অবজেক্ট থাকে, দিস- যেটা মূলত উইন্ডকেই পয়েন্ট করে, ভেরিয়েবল অবজেক্ট, স্কোপ চেইন(লেক্সিকাল স্কোপ) নামে আলাদা আলাদা অবজেক্ট।
এর পরের ফেজ হচ্ছে এক্সিকিউশন। কোড এক্সামপল থেকে পরিষ্কার ধারনা পাওয়া যাবে।

```js
/**
 * Execution Context
 * Basic function example
 */
var topic = 'JavaScript Execution Context';

function getTopic() {
	return topic;
}
getTopic();
```

এই কোডটা এক্সিকিউট হবে তখন এক্সিকিউশন কনট্যাক্সটা কেমন হবে দেখা যাক।
Loading/Creation ফেজ -

- Global Execution Context
  - `phase`: Loading/Creation
  - `window`: global object
  - `topic`: undefined
  - `getTopic`: fn()
  - `scope chain`

একটু খেয়াল করলে দেখবো এখানে ভেরিয়েবল অবজেক্টে আছে `topic`: undefined। লোডিং/ক্রিয়েশন ফেজে ভেরিয়েবল গুলো মেমরিতে একটা জায়গা এলোকেট হয় তার ভেলু সেট করে দেয় `undefined` দিয়ে।

ফাংশন গুলোও ভেরিয়েবল অবজেক্টে থাকে তবে ফাংশন ডেফিনেশনের একটা রেফাবেন্স আলাদাভাবে মেমরিতে স্টোর হয়ে থাকে যেটা পরিবর্তিতে এক্সিকিউশন ফেজ এসে কল হতে পারে।

Execution ফেজ -

- Global Execution Context
  - `phase`: Execution
  - `window`: global object
  - `topic`: "JavaScript Execution Context"
  - `getTopic`: fn()
  - `scope chain`

একটু খেয়াল করলে দেখবো এই ফেজ এ ভেরিয়েবলের ভ্যালু সেট হয়েছে `topic`: "JavaScript Execution Context"। এটাই তার আসল ভ্যালু। একটা মজার জিনিস দেখা যাক-

### Understanding Hoisting

```js
console.log(topic); // undefined
var topic = 'JavaScript Execution Context';

function getTopic() {
	return topic;
}
getTopic();
```

var দিয়ে ডিক্লেয়ার করা ভেরিবল ডিফাইন করার আগেই যদি আমারা ব্যাবহার করি তাহলে undefined হয় কারন লোডিং ফেসজ জেএস ইঞ্জিং এই ভ্যালুই সেট করে দিয়েছিলো। তাই এক্সিকিউশন ফেজ এসে আগের ফেজ থেকে পাওয়া ভ্যালুটাই পাবে কারন এরপরের লাইনে এসে তার একচুয়াল ভ্যালু সেট হয় যেটা হল - `topic`: "JavaScript Execution Context"। এই ঘটনাকেই জাভাস্ক্রিপটের `হইস্টিং(Hoisting)` বলা হয়।

## 2. `Function Execution Context`

আমরা আগেই জেনেছি গ্লোবাল একিকিউশন কন্টেক্সটে ফাংশন গুলোও ভেরিয়েবল অবজেক্টে থাকে তবে ফাংশন ডেফিনেশনের একটা রেফাবেন্স আলাদাভাবে মেমরিতে স্টোর হয়ে থাকে যেটা পরিবর্তিতে এক্সিকিউশন ফেজ এসে কল হতে পারে। এখন গ্লোবাল এক্সিকিউশন ফেজে এসে জেএস ইঞ্জিন যখন ফাংশন কল পাবে তখন বেসিক্যালি ফাংশন এক্সিকিউশন কন্টেক্সট তৈরি হয়। গ্লোবাল একিকিউশন কন্টেক্সট এর সাথে এর মুল পার্থক্যটা হল এখানে একটা `parameter/agruments`: object থাকে ফাংশনের প্যারামিটারগুলোকে রেখে দেয় কারন ফাংশন কল হলে সেটা ব্যাবহার করার প্রয়োজন হতে পারে। এছাড়া অন্যান্য জিনিষগুলো গ্লোবাল একিকিউশন কন্টেক্সটের মতই হয়। তাহলে যা যা থাকবে -

- একটা `parameter/agruments` অবজেক্ট তৈরি করে।
- this নামে একটা অবজেক্ট তৈরি করে।
- নিজের function আর variable এর জন্য মেমরিতে জায়গা তৈরি করে (তাই এখানেও হইস্টিং কার্যকর হবে)।
- variable গুলোকে undefined বসিয়ে দেয় (এজন্যই হইস্টিং হবে)

এখন আমরা তো জানি যে ফাংশনের মধ্যেও আবার ফাংশন থাকে, ফাংশন এক্সিকিউশন কন্টেক্সট একটা অবজেক্ট তার আগে আবার দেখলাম গ্লোবাল একিকিউশন কন্টেক্সটও একটা অবজেক্ট। তাহলে এই অবজেক্ট গুলো একটার পর একটা থাকছে তাই এদের ট্র্যাক রাখার জন্য জেএস ইঞ্জিনকে অবশ্যই কোন একটা ডেটা স্ট্রাকচার ব্যাবহার করতে হবে। এজন্য `স্ট্যাক/Stack(LIFO)` ব্যাবহার করা হয় এটাকে `এক্সিকিউশন/কল স্ট্যাক` বলা হয়। কল-স্ট্যাকের শুরুতেই গ্লোবাল একিকিউশন কন্টেক্সট কে রাখে এরপর ফাংশন এক্সিকিউশন কন্টেক্সটকে রাখে তার যদি নেস্টেড ফাংশন থাকে তাহলে তাদের এক্সিকিউশন কন্টেক্সটগুলোকেও একটার পর একটা করে রাখে।

এখন আমাদের কোড এক্সামপলের গ্লোবাল এক্সিকিউশন কন্টেক্সটের এক্সিকিউশন ফেজ এ ফিরে যাই -

Execution ফেজ -

- Global Execution Context
  - `phase`: Execution
  - `window`: global object
  - `topic`: "JavaScript Execution Context"
  - `getTopic`: fn()
  - `scope chain`

এই ফেজে যখন `getTopic()` কল করার লাইনে যখন আসবে তখনই বেসিক্যালি নতুন একটি এক্সিকিউশন কন্টেক্সট তৈরি হয়।

1. Loading/Creation ফেজ

- getTopic() Execution Context
  - `phase`: Loading/Creation
  - `agruments`: { }
  - `this`: window

2. Execution ফেজ

- getTopic() Execution Context
  - `phase`: Execution
  - `agruments`: { }
  - `this`: window

এই ফেজে সে ফাংশনের বডি এক্সিকিউট করবে। যখনই return পাবে তখনই এক্সিকিউশন ফেজ থেকে বেরিয়ে যাবে। যদি ফাংশনের বডিতে কোন return না পায় তাহলে ডিফল্ট undefined পায় এবং এক্সিকিউশন শেষ হয়।

### Execution Stack for nested functions | Discover Hoisting

```js
/**
 * Execution Context
 * Execution Stack: Nested function example
 * Discovering Hoisting
 */
var a = 1;
function one() {
	console.log(a); // 1
	function two() {
		console.log(b); // undefined
		var b = 2;
		function three(d) {
			console.log(c + d); // ReferenceError
			let c = 3;
			// console.log(c + d); // 7
		}
		three(4);
	}
	two();
}
one();
```

**Global Execution Context**

- `phase`: Loading/Creation
- `window`: global object
- `this`: window
- `a`: undefined
- `one`: fn()

**Global Execution Context**

- `phase`: Execution
- `window`: global object
- `this`: window
- `a`: 1
- `one`: fn()
  - _one() Execution Context_
    - `phase`: Loading/Creation
    - `arguments`: { }
    - `this`: window
    - `two`: fn()
  - _one() Execution Context_
    - `phase`: Execution
    - `arguments`: { }
    - `this`: window
    - `two`: fn()
      - _two() Execution Context_
        - `phase`: Loading/Creation
        - `arguments`: { }
        - `this`: window
        - `b`: undefined
        - `three`: fn()
      - _two() Execution Context_
        - `phase`: Execution
        - `arguments`: { }
        - `this`: window
        - `b`: 2
        - `three`: fn()
          - _three() Execution Context_
            - `phase`: Loading/Creation
            - `arguments`: { 0: 4}
            - `this`: window
            - `d`: 4
          - _three() Execution Context_
            - `phase`: Execution
            - `arguments`: { 0: 4}
            - `this`: window
            - `d`: 4
            - ~~`c`: 3~~

**Execution Stack**

```js
{
  0:  Global Execution Context,
  1:  one() Execution Context,
  2:  two() Execution Context,
  3:  three() Execution Context,
}
```

ফাংশন এক্সিকিউশন এর এক্সিকিউশন ফেজে এসে জেএস ইঞ্জিন যখন নেস্টেড ফাংশন কল পাবে তখন এক্সিকিউশন/কল স্ট্যাকে সেটা পুশ করা হয়।

three() এক্সিকিউশন শেষে এটার এক্সিকিউশন কন্টেক্স থেকে বের হয়ে যাবে, এরপর two() , এরপর one() এবং শেষে Global Execution Context। আর এক্সিকিউশন শেষে ক্রমান্বয়ে এক্সিকিউশন/কল স্ট্যাক থেকে পপ হতে থাকে।

আগেই দেখেছিলাম জাভাস্ক্রিপটের `হইস্টিং(Hoisting)`, একই কারনে two() ও three() ফাংশনের এক্সিকিউশন ফেজে এই এররগুলো হয়েছে।

    console.log(b); // undefined
    console.log(c + d); // ReferenceError

### Discover Lexical Scope

```js
/**
 * Discover Lexical Scope
 */
function hello() {
	var msg = 'Hello World!';
}
hello();
console.log(msg); // ReferenceError
```

**Global Execution Context**

- `phase`: Loading/Creation
- `window`: global object
- `this`: window
- `hello`: fn()

**Global Execution Context**

- `phase`: Execution
- `window`: global object
- `this`: window
- `hello`: fn()
  - _hello() Execution Context_
    - `phase`: Loading/Creation
    - `arguments`: { }
    - `msg`: undefined
    - `this`: window
  - _hello() Execution Context_
    - `phase`: Execution
    - `arguments`: { }
    - `msg`: 'Hello World!'
    - `this`: window
- এবার console.log(msg); এক্সিকিউট হবে, কিন্তু এই কনট্যাক্সে তো msg বলে কিছু নাই। এটার কোন রেফেরান্স নেই। ফলে ReferenceError দেখাবে।

_নোটঃ_ স্কোপ মনে রাখার জন্য - প্যারেন্টের সবকিছু চাইল্ড এক্সেস করতে পারে কিন্তু চাইল্ডের কিছুই প্যারেন্ট এক্সেস করতে পারে না।

### Discover Closure

```js
/**
 * Discover Closure
 */
var sum = 0;

function doSum(a) {
	return function (b) {
		return a + b;
	};
}

var temp = doSum(2);
sum = sum + temp(8);
```

**Global Execution Context**

- `phase`: Loading/Creation
- `window`: global object
- `this`: window
- `sum`: undefined
- `temp`: undefined
- `doSum`: fn()

**Global Execution Context**

- `phase`: Execution
- `window`: global object
- `this`: window
- `sum`: 0
- `temp`: undefined
- `doSum`: fn()
  - _doSum() Execution Context_
    - `phase`: Loading/Creation
    - `arguments`: {0: 2}
    - `this`: window
    - `a`: 2
    - `anonymous`: fn()
  - _doSum() Execution Context_
    - `phase`: Execution
    - `arguments`: {0: 2}
    - `this`: window
    - `a`: 2
    - `anonymous`: fn()
    - doSum() এক্সিকিউশন শেষে স্ট্যাক থেকে পপ হয়ে যাবে, কিন্তু যেহেতু এটি ফাংশন রিটার্ন করছে যেটা পরবর্তিতে কল হবে কিনা জেএস সেটা জানে না। আবার রিটার্ন ফাংশনটি doSum() এর উপর ডিপেন্ডেন্ট তাই এর রেফারেন্স নিয়ে ক্লোজার নামে একটি স্কোপ তৈরি করবে।
  - _Closure Scope Execution Context_
    - `phase`: Execution
    - `arguments`: {0: 2}
    - `this`: window
    - `a`: 2
    - `anonymous`: fn()
      - _temp() Execution Context_
        - `phase`: Loading/Creation
        - `arguments`: {0: 8}
        - `this`: window
        - `b`: 8
      - _temp() Execution Context_
        - `phase`: Execution
        - `arguments`: {0: 8}
        - `this`: window
        - `b`: 8
        - রিটার্ন পেয়ে এক্সিকিউশন ফেজ শেষ হবে।
      - এবার ভ্যালুগুলো - temp() Execution থেকে ৮ এবং Closure Scope Execution থেকে ২ গ্লোবাল এক্সিকিউশন কন্টেক্সটের এক্সিকিউশন যাবে।
    - এখন আলটিমেটলি doSum: 10, ক্লোজারের এক্সিকিউশন শেষ হবে ।
- গ্লোবাল এক্সিকিউশন কন্টেক্সটের এক্সিকিউশন শেষ হবে।
