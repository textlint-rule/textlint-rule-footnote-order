const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
import rule from "../src/textlint-rule-footnote-order";
// ruleName, rule, { valid, invalid }
tester.run("textlint-rule-footnote-order", rule, {
    valid: [
        `valid text.
foo [^1].
bar [^2].


[^1]: foo is ...
[^2]: bar is ...
`,
        {
            text: `
one [^0]
two [^1]


[^0]: one
[^1]: two
`,
            options: {
                startIndex: 0
            }
        }
    ],
    invalid: [
        {
            text: `
foo [^foo]
bar [^bar]


[^foo]: foo
[^bar]: bar
`,
            output: `
foo [^1]
bar [^2]


[^1]: foo
[^2]: bar
`,
            errors: [
                {
                    line: 2,
                    column: 6
                },
                {
                    line: 3,
                    column: 6
                },
                {
                    line: 6,
                    column: 1
                },
                {
                    line: 7,
                    column: 1
                }
            ]
        },
        // remark treat these as linkReference
        {
            text: `
foo [^foo]
bar [^bar]


[^foo]: foo is ...
[^bar]: bar is ...
`,
            output: `
foo [^1]
bar [^2]


[^1]: foo is ...
[^2]: bar is ...
`,
            errors: [
                {},
                {},
                {},
                {}
            ]
        },
        {
            text: `
foo [^foo]
bar [^bar]


[^foo]: foo
[^bar]: bar
`,
            output: `
foo [^1]
bar [^2]


[^1]: foo
[^2]: bar
`,
            errors: [
                {
                    line: 2,
                    column: 6
                },
                {
                    line: 3,
                    column: 6
                },
                {
                    line: 6,
                    column: 1
                },
                {
                    line: 7,
                    column: 1
                }
            ]
        },
        {
            text: `
foo [^foo]
bar [^bar]


[^foo]: foo
[^bar]: bar
`,
            output: `
foo [^1]
bar [^2]


[^1]: foo
[^2]: bar
`,
            errors: [
                {
                    line: 2,
                    column: 6
                },
                {
                    line: 3,
                    column: 6
                },
                {
                    line: 6,
                    column: 1
                },
                {
                    line: 7,
                    column: 1
                }
            ]
        },
        {
            text: `
bar [^2]
foo [^1]


[^2]: bar
[^1]: foo
`,
            output: `
bar [^1]
foo [^2]


[^1]: bar
[^2]: foo
`,
            errors: [{}, {}, {}, {}]
        },
        // complex
        {
            text: `
foo [^foo]
bar [^bar]


[^foo]: foo
[^bar]: bar
`,
            output: `
foo [^1]
bar [^2]


[^1]: foo
[^2]: bar
`,
            errors: [
                {
                    line: 2,
                    column: 6
                },
                {
                    line: 3,
                    column: 6
                },
                {
                    line: 6,
                    column: 1
                },
                {
                    line: 7,
                    column: 1
                }
            ]
        },
        {
            text: `
foo [^foo]
bar [^1]


[^foo]: foo
[^1]: bar
`,
            output: `
foo [^1]
bar [^2]


[^1]: foo
[^2]: bar
`,
            errors: [{}, {}, {}, {}]
        },
        // complex

        {
            text: `
This is foo [^foo].

[link](https://example.com) is bar [^bar].
[title][] is link.

[^foo]: foo
[title]: https://example.com
[^bar]: bar
`,
            output: `
This is foo [^1].

[link](https://example.com) is bar [^2].
[title][] is link.

[^1]: foo
[title]: https://example.com
[^2]: bar
`,
            errors: [{}, {}, {}, {}]
        }
    ]
});
