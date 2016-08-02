# eslint-formatters-calypso

A set of formatters to be used by ESLint and utilities to build new formatters upon.

Formatters available:

* `lines-modified`: downgrade ESLint `errors` to `warnings`, except for lines modified in the topic branch.
* `lines-modified-and-specific-rules`: downgrade ESLint `errors` to `warnings`, except for lines modified in the topic branch and the rules in the `.eslines.json` file.
* `parsing-errors`: takes the ESLint original report and outputs a new one containing only `parsing errors`.
* `eslines`: a wrapper formatter. If the branch active is `master`, would return the results of `parsing-errors` formatter. Otherwise, would return the results of `lines-modified-and-specific-rules` formatter.

### How to install

From npm:

	npm install eslint-formatters-calypso

From source:

	npm install <path-to-local-src-directory>

### How to use it

#### As a formatter

Pass the formatter to the ESLint runner. For example:

	eslint -f <path-to-src>/src/formatters/parsing-errors.js .

#### As a processor of ESLint output

As the formatters speak JSON, you may want to display the info in a more readable way. Try this instead:

	eslint -f json . | eslines

Or:

	eslint -f json . | eslines -p parsing-errors -f junit
	eslint -f json . | eslines -p lines-modified -f html

ESLines script would use, by default, the `eslines` processor but any other one can by provided by using `-p` option (or `--processor`).

ESLines script also plays nicely with any other valid ESLint formatter. It would use 'stylish' -the ESLint default- if none provided so the output is human-friendly, but you can choose the one you want by using `-f` option (or `--format`).

### How to configure the formatters

These options help you to understand how the formatters behave and configure them if you need it.

#### How to set the rules to not downgrade

The formatter `lines-modified-and-specific-rules` can be told to not downgrade certain rules, although the errors be on lines not modified. This is configured in the `.eslines.json` file to be saved in the root of your repo.

	{
		"rulesToNotDowngrade": ["no-unused-vars"]
	}

For any rule declared in the array `rulesToNotDowngrade`, the `errors` that ESLint reports would be not downgraded to `warnings` by the formatter. In the example above, any reported `error` for `no-unused-vars` would be reported as an `error` as well, no matter in which line they happened.

#### How are lines modified calculated

The formatters `lines-modified` and `lines-modified-and-specific-rules` need git to calculate the lines modified. They work by constructing a git diff and then extract the lines modified from it. By default, the diff would be constructed comparing the git `topic branch` with the remote `origin/master`.

If the `ESLINES_DIFF` environment variable is set to `index`, the diff would be constructed for the files within the git index. For example:

	export ESLINES_DIFF='index'
	eslint -f <path-to-src>/src/formatters/lines-modified.js .
	unset ESLINES_DIFF

would take as lines modified the ones from files in the git index, if any.

#### How eslines choose what formatter to run

The formatter `eslines` is a wrapper for executing `lines-modified-and-specific-rules` or `parsing-errors` depending on the branch active (`topic branch` or `master`, respectively). By default, would take the branch active from git.

If the environment variable `ESLINES_BRANCH` is set, the `topic branch` would be taken from it, as for example:

	git checkout master
	export ESLINES_BRANCH='topic-branch'
	eslint -f <path-to-src>/src/formatters/eslines.js .
	unset ESLINES_BRANCH

would run `lines-modified-and-specific-rules` formatter as the `ESLINES_BRANCH` environment variable is set to a branch other than `master`.
