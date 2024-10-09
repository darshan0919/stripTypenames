## Problem Statement
You are given a form with a bunch of fields.

**Task**: Implement Collapsible Behaviour for Fields

**Objective**: Modify withCollapsibleInput HOC to support the following requirements

**Requirements**:
1. Fields without `collapsibleConfig` should not show a checkbox and label to collapse
2. Toggling collapsible checkbox should toggle visibility of the field
3. `initialValue` supplied via `collapsibleConfig` should be used to prepopulate the field when collapsoble input is expanded and no value present in profile for it
4. If the user modifies value of a collapsible field and toggles it off. Then on expanding the field again, the modified value should appear in the field

**Structure of collapsibleConfig**
```aiignore
collapsibleConfig: {
    title: 'Text that will be disaplayed against the checkbox'
    initialValue: 'Optionally present value for the field, to be used when there is no value present in profile'
}
```

## Submission Instructions
1. Clicking "Run code" will compile and run your code against sample tests, but it will not generate scores. Click on "Execution Log" to better understand the test execution.
2. Clicking "Submit code" will run your code against multiple test cases, assessing different scenarios holistically. The score will be assigned accordingly.

To access the instructions, click on the "Question" button which can be found in the bottom left corner of the screen.
