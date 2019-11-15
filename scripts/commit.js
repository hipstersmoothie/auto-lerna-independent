const dedent = require("dedent");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const createFormula = (version, sha) => dedent`
  class Auto < Formula
    desc "Generate releases based on semantic version labels on pull requests."
    homepage "https://intuit.github.io/auto/home.html"
    url "https://github.com/intuit/auto/releases/download/v${version}/auto-macos.gz"
    sha256 "${sha}"

    def install
      libexec.install Dir["*"]
      bin.install libexec/"auto-macos"
      mv bin/"auto-macos", bin/"auto"
    end

    test do
      system bin/"auto", "--version"
    end
  end
`;

module.exports = class {
  constructor() {
    this.name = "brew";
  }

  apply(auto) {
    auto.hooks.afterVersion.tap("Update brew", () => {
      const version = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../lerna.json"))
      ).version;

      fs.writeFileSync("test.txt", version);
      execSync("git add test.txt");
      execSync('git commit -m "Bump brew formula [skip ci]" --no-verify');
      auto.logger.verbose.info("Committed new formula");
    });
  }
};
