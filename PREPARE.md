# Evaluation Setup

This file is outside the editable surface. It defines how results are judged. Agents cannot modify the evaluator or the scoring logic — the evaluation is the trust boundary.

Consider defining more than one evaluation criterion. Optimizing for a single number makes it easy to overfit and silently break other things. A secondary metric or sanity check helps keep the process honest.

eval_cores: 1
eval_memory_gb: 1.0
prereq_command: npm test

## Setup

Install dependencies and prepare the evaluation environment:

```bash
npm install
```

The `prereq_command` is set to `npm test` to ensure all tests pass before benchmarking. This validates correctness before measuring performance.

## Run command

```bash
node benchmark.js
```

## Output format

The benchmark prints `METRIC=<number>` to stdout, where the number represents the average operations per second across 10 common ES abstract operation benchmarks.

## Metric parsing

The CLI looks for `METRIC=<number>` or `ops_per_sec=<number>` in the output.

## Ground truth

**Baseline: ~42.3M ops/sec** (measured on initial commit)

The benchmark measures the aggregate performance of commonly used abstract operations:
- `Type()` - type checking for numbers, strings, objects, null
- `ToString()` - string conversion for numbers and strings  
- `ToNumber()` - number conversion for numbers and strings
- `IsCallable()` - callable checking for functions and objects

Each operation is run 1,000,000 times and the operations per second is calculated. The metric is the average ops/sec across all 10 test cases. This provides a balanced measure of performance across different operation types and input values.

The benchmark is deterministic and can be reproduced on any machine. Performance improvements should maintain correctness - all tests in `npm test` must pass.
