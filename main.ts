import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "My son asked why I check the weather before every barbecue. I said, 'Because I like my forecasts well done.'";

const OUTPUT_PATH = "/output/entry.txt";

function validate(joke: string): void {
  if (joke.length < 1 || joke.length > 200) {
    throw new Error(`Joke must be 1-200 characters, got ${joke.length}.`);
  }
  if (joke.trim().length === 0) {
    throw new Error("Joke must not be only whitespace.");
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("Joke must be a single line.");
  }
}

validate(JOKE);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, JOKE, "utf8");
// Round-trip check: what was written must be exactly the validated joke.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== JOKE) {
  throw new Error("Written file does not match the validated joke.");
}
validate(written);
console.log(`Wrote ${JOKE.length} characters to ${OUTPUT_PATH}`);
