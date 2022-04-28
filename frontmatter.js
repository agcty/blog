var fs = require("fs");
var path = require("path");
var fm = require("front-matter");

const POSTS_DIR = path.join(process.cwd(), "app/routes/blog");

function fetch() {
  const posts = fs.readdirSync(POSTS_DIR);

  const postList = [];

  for (let post of posts) {
    console.log(post);

    const postFileContents = fs.readFileSync(
      path.join(POSTS_DIR, post),
      "utf8"
    );
    const frontMatter = fm(postFileContents);

    postList.push(frontMatter.attributes);
  }

  console.log(postList);

  postList.sort((a, b) => new Date(b.date) - new Date(a.date));
  fs.writeFileSync("./posts.json", JSON.stringify(postList));
}

fetch();
