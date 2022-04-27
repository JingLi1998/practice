import * as events from "events";
import * as fs from "fs";
import * as readline from "readline";

main().catch((e) => console.log(e));

async function main() {
  const rl = readline.createInterface({
    input: fs.createReadStream("wordle-sorted.txt"),
  });

  const words = [];

  rl.on("line", (line) => {
    words.push(line);
  });

  await events.once(rl, "close");

  shuffle(words);

  const writer = fs.createWriteStream("wordle-generated.js");

  writer.write("export const words = [");
  words.map((word, i) => writer.write(`${i === 0 ? "" : ", "}"${word}"`));
  writer.write("]");

  writer.close();
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
