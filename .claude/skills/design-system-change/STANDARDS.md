# Engineering standards

Four checks for every change. Each item is a fail condition a reviewer can point at. The
"Leave alone" lists stop over-correction: a finding must not land on them.

## 1. Comments, doc comments and commit messages

Prose follows ASD-STE100 Issue 9 (Simplified Technical English), adapted to code. Code spans,
identifiers, CSS properties and tokens, numbers with units and RFC designators are technical
nouns: each counts as one word and is never reworded.

- Classify each sentence. A step the reader does is **procedural**: imperative, at most 20
  words. Everything else is **descriptive**: at most 25 words; a paragraph has at most six
  sentences and one topic.
- One instruction per sentence. Put sequential steps in a numbered list.
- Condition first: "If the dialog is closed, return focus to the trigger."
- Active voice with a named actor: "The tooltip shows the full label." Use the passive only when
  the actor is unknown.
- Simple tenses: present, past, future, imperative. Write "watches", not "is watching" or "has
  watched".
- A verb for an action: "Close the dialog", not "perform the closing of the dialog".
- An `-ing` word only as a technical noun (`isLoading`, "loading state") or in "during",
  "missing", "remaining".
- Full sentences: keep articles and verbs, write "does not" for "doesn't", and use periods, not
  semicolons.
- Noun clusters of at most three words: "the focus ring of the menu item".
- One term per concept and one meaning per term: the term the code and docs already use.
- A single verb when one exists: "configure", not "set up".
- `NOTE:` states a fact. Write an instruction as its own imperative sentence.
- `WARNING:` only on a destructive operation (data loss, a security boundary): the
  condition or command first, then the concrete result.
- Keep the spelling the repository already uses; do not mix British and American forms.
- Commit subject: the Conventional Commits prefix, then one imperative instruction of at most 20
  words. Body: descriptive sentences of at most 25 words that say why.

Leave alone: code, literals, log keys and metric names; quoted upstream text, licence headers and
generated files; tags and labels (`# Safety`, `SAFETY:`, `TODO(name):`, `@param`); RFC 2119
MUST/SHOULD in a contract; comments the change does not touch. These rules govern how a comment
reads, not whether to write one.

```ts
// Before: we're stopping propagation here because otherwise the menu closes when clicking inside
// After:  Stop the event here. Without this, a click inside the popup closes the menu.
```

```text
Before: tweaked button colors
After:  fix(button): make the destructive buttons meet 4.5:1

        The text on the destructive surface was below the WCAG AA contrast of 4.5:1.
```

## 2. Tests

A test earns its place when it fails because a promise broke, and only then. Ask four questions
(Khorikov): does it catch a real regression, survive a refactor that keeps the behaviour, run
fast, and read clearly?

Delete or rewrite a test that:

- restates the implementation: an expected value copied from the code, a mocked sequence of
  internal calls, a table, `match` or `switch` copied into the test (a change-detector);
- asserts internal interactions (which helper, a harmless call order) where output or state is
  observable. Keep a call count or order that is itself the requirement;
- reaches private code through a test-only export when the public interface shows the result;
- tests the language, a framework, a library or generated code, with no behaviour of ours;
- tests trivial code: getters, constants, a component that only passes props through;
- pins exact log text, a full error sentence or map order that no caller reads;
- is a large snapshot or golden file that people regenerate without reading;
- passes when the result is wrong (no assertion, or only "did not fail").

Merge tests that share setup and action and differ only in input into one table of named cases (`it.each`).
Split a test that checks unrelated behaviours; several assertions about one outcome are one
behaviour.

Move a rule tested at several levels to the lowest level that can see it. Keep a browser test only
for what a function test cannot see: rendering, focus, keyboard use. A test that uses the
network, disk, a sleep or a cluster belongs in the suite for its size; do not delete it for being
slow.

Before you remove a test, name the promise it protects and the test that still protects it. A
mutation report that shows no unique kill is a reason to look, not proof.

Leave alone: published names and props (`src/compat.test.ts`); regression tests of fixed bugs; small reviewed
golden files; property and fuzz tests; coverage or test count on its own.

```ts
// Before: one test per input
it("rejects empty", …); it("rejects spaces", …);
// After
it.each(["", " "])("rejects %j", (name) => expect(validName(name)).toBe(false));
```

## 3. Design: build for a caller that exists

Flag a structure when no present caller can be named:

- a trait or interface with one production implementation and no real boundary behind it;
- a generic parameter or dynamic dispatch that serves one concrete type;
- a parameter, option, flag, config key or hook that no production code sets;
- a wrapper or layer that forwards the same arguments and result and adds no invariant
  (a pass-through);
- a configuration knob for a value the code can compute;
- a registry, plugin system, DSL or rules engine with one use;
- shared code that grows a mode flag per caller: inline it, delete each caller's unused branches,
  then extract what is really shared (Metz, "The Wrong Abstraction");
- an abstraction drawn from one or two call sites that do not match yet: wait for the third. A
  duplicated security check is the exception: give it one implementation now;
- an internal API with versions or adapters and one consumer that ships with it;
- a large design with no working simple path first (Gall).

A finding names the cost, the missing caller, and the simpler design that keeps the behaviour.

Leave alone: a seam at a real out-of-process boundary; layers that enforce accessibility or
correctness (focus management, ARIA wiring); published names and props (`src/compat.test.ts`: removing one is a deprecation, not a cleanup); React context providers, compound components; the second copy of a block; a deep module that hides much
behind a small interface.

```tsx
// Before: props for callers that do not exist
<Card variant="default" renderHeader={undefined} onBeforeOpen={noop} legacyLayout={false} />
// After
<Card />
```

## 4. Scale: no unbounded cost on day one

Fail a design when its cost per request, item, tenant, tab or replica grows with no bound, or
when a second replica breaks it. A finding names the growth variable, the resource and the
missing bound.

**Components**

- A component that renders a collection works with a page or a virtualized window of rows. It
  does not need every row in the DOM.
- A component does not fetch or start a polling timer itself; the app owns data and its refresh.

Leave alone: short fixed lists (a menu, a set of tabs); components far below any measured budget.
