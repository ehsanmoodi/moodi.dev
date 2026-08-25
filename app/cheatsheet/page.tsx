import type { Metadata } from "next";
import {
  BackToTop,
  CodeBlock,
  Heading,
  KeyTable,
  Note,
  SectionNav,
} from "./components";

export const metadata: Metadata = {
  title: "Cheat Sheet",
  description:
    "A terminal and editor workflow cheat sheet: Ghostty, fish, tmux, Neovim (LazyVim), Claude Code, and git — keybinds and commands in one printable reference.",
};

const sections = [
  { id: "daily-workflow", label: "Workflow" },
  { id: "ghostty", label: "Ghostty" },
  { id: "fish-shell", label: "Fish shell" },
  { id: "navigation", label: "Navigation" },
  { id: "tmux", label: "tmux" },
  { id: "wt-orchestrator", label: "wt" },
  { id: "neovim", label: "Neovim" },
  { id: "claude-neovim", label: "Claude + Neovim" },
  { id: "git", label: "Git" },
  { id: "cli-reference", label: "CLI reference" },
  { id: "maintenance", label: "Maintenance" },
];

export default function CheatSheet() {
  return (
    <section id="top">
      <h1 className="mb-3 text-2xl font-medium">Cheat Sheet</h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        A terminal and editor workflow: Ghostty, fish, tmux, Neovim
        (LazyVim), and Claude Code, wired together for agentic coding. Print
        it, pin it, learn a few keys a day.
      </p>

      <SectionNav sections={sections} />

      <div className="prose prose-neutral dark:prose-invert">
        <blockquote>
          <p>
            Legend: <code>prefix</code> = tmux prefix ={" "}
            <strong>
              <code>Ctrl-a</code>
            </strong>
            . <code>&lt;leader&gt;</code> (Neovim) ={" "}
            <strong>
              <code>Space</code>
            </strong>
            . <code>C-x</code> = Ctrl+x. <code>M-x</code> = Alt/Option+x.{" "}
            <code>cmd</code> = ⌘ (Ghostty only).
          </p>
        </blockquote>

        <Heading id="daily-workflow">0. The daily agentic workflow</Heading>
        <p>Start here — this is the loop everything else supports.</p>
        <CodeBlock
          code={`# 1. open Ghostty → you're in fish. cd to a project (or use z)
z myproject

# 2. start the cockpit
tmux                      # or: sesh connect (prefix T from inside tmux)

# 3a. focused work: editor + one agent
nvim .                    # window 1
prefix a                  #  → spawns a Claude Code pane on the right

# 3b. parallel agents: one isolated worktree per task
wt login-bug              # new branch+worktree+session: nvim | claude windows
wt payment-flow           # a SECOND agent, totally isolated
prefix T                  # fuzzy-jump between agent sessions (sesh)

# 4. review & commit
prefix g                  # lazygit popup — stage hunks, commit, push`}
        />
        <p>
          <strong>Two agent modes, pick per task:</strong>
        </p>
        <ul>
          <li>
            <strong>Parallel</strong> → <code>wt &lt;branch&gt;</code>{" "}
            (throughput; 2–4 agents on separate branches).
          </li>
          <li>
            <strong>In-editor</strong> → <code>&lt;leader&gt;ac</code> in
            Neovim (tight loop; inline diff review).
          </li>
        </ul>

        <Heading id="ghostty">1. Ghostty (terminal)</Heading>
        <KeyTable
          headers={["Key", "Action"]}
          rows={[
            ["`cmd+d`", "split right"],
            ["`cmd+shift+d`", "split down"],
            ["`cmd+w`", "close split/tab"],
            ["`cmd+k`", "clear screen"],
            ["`cmd+enter`", "fullscreen"],
            ["`cmd+t` / `cmd+1..9`", "new tab / jump to tab"],
          ]}
        />
        <Note>
          Day to day, most splitting happens in <strong>tmux</strong>{" "}
          (persistent, scriptable) rather than Ghostty. Ghostty tabs are for
          keeping separate projects apart.
        </Note>

        <Heading id="fish-shell">2. fish shell + abbreviations</Heading>
        <p>
          Abbreviations <strong>expand inline</strong> as you type (press
          space) so the real command is always visible.
        </p>
        <KeyTable
          headers={["Abbr", "Expands to"]}
          rows={[
            ["`v` / `vi`", "`nvim`"],
            ["`ls` / `ll` / `la`", "`eza` (icons, git, long, all)"],
            ["`lt`", "`eza --tree --level=2`"],
            ["`cat`", "`bat`"],
            [
              "`g` `gs` `ga` `gaa` `gc` `gcm` `gco` `gd` `gl` `gp` `gpl`",
              "git shortcuts",
            ],
            ["`lg`", "`lazygit`"],
            ["`cl` / `clc`", "`claude` / `claude --continue`"],
            ["`..` `...`", "`cd ..` / `cd ../..`"],
            ["`top`", "`btop`"],
          ]}
        />
        <KeyTable
          headers={["Key", "Action"]}
          rows={[
            ["`→` / `Ctrl-f`", "accept autosuggestion (the grey text)"],
            ["`Alt-→`", "accept one word of suggestion"],
            ["`Tab`", "completions (fish has great built-ins)"],
            ["`Ctrl-r`", "atuin history search (fuzzy, full-screen)"],
            ["`↑`", "plain fish history (prefix-matched)"],
            ["`Ctrl-t`", "fzf file picker → inserts path"],
            ["`Alt-c`", "fzf cd into subdirectory"],
            ["`Ctrl-c` / `Ctrl-l`", "cancel line / clear"],
          ]}
        />

        <Heading id="navigation">3. Navigation (zoxide · fzf · yazi)</Heading>
        <CodeBlock
          code={`z foo            # jump to best-matching dir you've visited (frecency)
zi               # interactive zoxide picker (fzf)
y                # open yazi file manager; quit with q → shell cd's there`}
        />
        <p>
          <strong>fzf inside other tools:</strong> <code>Ctrl-t</code>{" "}
          (files), <code>Alt-c</code> (dirs), <code>**&lt;Tab&gt;</code>{" "}
          after a command for fuzzy completion (e.g.{" "}
          <code>nvim **&lt;Tab&gt;</code>, <code>kill **&lt;Tab&gt;</code>).
        </p>
        <p>
          <strong>yazi keys:</strong> <code>h j k l</code> move ·{" "}
          <code>space</code> select · <code>y</code>/<code>x</code>/
          <code>p</code> yank/cut/paste · <code>a</code> create ·{" "}
          <code>d</code> delete · <code>r</code> rename · <code>/</code> find
          · <code>q</code> quit (cd&apos;s via the <code>y</code> fn) ·{" "}
          <code>Enter</code> open · <code>gg</code>/<code>G</code> top/bottom.
        </p>

        <Heading id="tmux">4. tmux (the cockpit)</Heading>
        <p>
          Prefix = <strong>Ctrl-a</strong>. Press prefix, release, then the
          key.
        </p>
        <KeyTable
          headers={["Key", "Action"]}
          rows={[
            ["`prefix |`", "split right (keeps cwd)"],
            ["`prefix -`", "split down (keeps cwd)"],
            ["`prefix c`", "new window (keeps cwd)"],
            ["`prefix 1..9`", "go to window N"],
            ["`prefix ,`", "rename window"],
            ["`prefix z`", "zoom/unzoom pane (fullscreen one pane)"],
            ["`prefix H/J/K/L`", "resize pane (repeatable)"],
            ["`C-h/C-j/C-k/C-l`", "move between panes and nvim splits"],
            ["`prefix T`", "sesh session switcher (fuzzy)"],
            ["`prefix L`", "last session"],
            ["`prefix d`", "detach (session keeps running)"],
            ["`prefix a`", "spawn a Claude Code pane (right)"],
            ["`prefix g`", "lazygit popup"],
            ["`prefix [`", "copy mode (then v select, y yank, q quit)"],
            ["`prefix r`", "reload tmux config"],
          ]}
        />
        <CodeBlock
          code={`tmux             # start / attach
tmux ls          # list sessions
tmux a -t name   # attach to a session
sesh list        # all sessions/projects (used by prefix T)`}
        />
        <Note>
          Sessions survive terminal restarts (resurrect + continuum
          auto-save/restore).
        </Note>

        <Heading id="wt-orchestrator">
          5. The <code>wt</code> orchestrator (parallel agents)
        </Heading>
        <CodeBlock
          code={`wt <branch>      # create/attach: worktree + tmux session (nvim | claude)
wt ls            # list worktrees and tmux sessions
wt cd <branch>   # print worktree path → cd "$(wt cd <branch>)"
wt rm <branch>   # remove worktree + kill its session`}
        />
        <p>
          Worktrees live in <code>../&lt;repo&gt;.worktrees/&lt;branch&gt;</code>.
          Each is a full isolated checkout on its own branch, so agents never
          collide. Switch between running agents with <code>prefix T</code>.
        </p>

        <Heading id="neovim">6. Neovim (LazyVim)</Heading>
        <p>
          Leader = <strong>Space</strong>. First launch auto-installs
          LSPs/formatters via Mason (watch with <code>:Mason</code>).
        </p>
        <h3>Essentials</h3>
        <KeyTable
          headers={["Key", "Action"]}
          rows={[
            ["`<leader>` then wait", "which-key popup shows every menu"],
            ["`<leader><space>`", "find files (root)"],
            ["`<leader>/`", "live grep (ripgrep)"],
            ["`<leader>,`", "switch buffer"],
            ["`<leader>e`", "file explorer (neo-tree)"],
            ["`<leader>fr`", "recent files"],
            ["`<C-d>` / `<C-u>`", "half-page down/up (centered)"],
            ["`<leader>w` `<leader>q`", "save / quit hints under which-key"],
            ["`<S-h>` / `<S-l>`", "prev / next buffer"],
            ["`<leader>bd`", "close buffer"],
          ]}
        />
        <h3>Code / LSP</h3>
        <KeyTable
          headers={["Key", "Action"]}
          rows={[
            ["`gd` / `gr`", "go to definition / references"],
            ["`gD` / `gI`", "declaration / implementation"],
            ["`K`", "hover docs"],
            ["`<leader>ca`", "code action"],
            ["`<leader>cr`", "rename symbol"],
            ["`<leader>cf`", "format buffer"],
            ["`<leader>cd`", "line diagnostics"],
            ["`]d` / `[d`", "next / prev diagnostic"],
            ["`<leader>ss`", "document symbols"],
          ]}
        />
        <h3>Editing</h3>
        <KeyTable
          headers={["Key", "Action"]}
          rows={[
            ["`gcc` / `gc` (visual)", "toggle comment line / selection"],
            ["`<leader>sr`", "search & replace (grug-far)"],
            ["`s`", "flash jump (type 2 chars → label)"],
            ["`ys`/`cs`/`ds`", 'add/change/delete surround (e.g. `ysiw"`)'],
            ["`<C-\\>`", "toggle terminal"],
            ["`<leader>gg`", "lazygit inside nvim"],
          ]}
        />
        <h3>Completion (blink.cmp)</h3>
        <p>
          <code>Tab</code>/<code>S-Tab</code> navigate · <code>Enter</code>{" "}
          accept · <code>C-Space</code> open · <code>C-e</code> close.
        </p>

        <Heading id="claude-neovim">
          7. Claude Code inside Neovim (claudecode.nvim)
        </Heading>
        <KeyTable
          headers={["Key", "Mode", "Action"]}
          rows={[
            ["`<leader>ac`", "n", "toggle Claude Code"],
            ["`<leader>af`", "n", "focus the Claude window"],
            ["`<leader>aC`", "n", "continue last conversation"],
            ["`<leader>ar`", "n", "resume a conversation"],
            ["`<leader>ab`", "n", "add current buffer to context"],
            ["`<leader>as`", "v", "send selection to Claude"],
            ["`<leader>as`", "tree", "add highlighted file (in neo-tree)"],
            ["`<leader>aa` / `<leader>ad`", "n", "accept / deny a proposed diff"],
            ["`<leader>am`", "n", "pick Claude model"],
          ]}
        />
        <p>
          Flow: select code → <code>&lt;leader&gt;as</code> → ask Claude to
          change it → review the diff it proposes →{" "}
          <code>&lt;leader&gt;aa</code> to accept or{" "}
          <code>&lt;leader&gt;ad</code> to reject.
        </p>

        <Heading id="git">8. Git: lazygit + delta</Heading>
        <p>
          <code>lazygit</code> (or <code>prefix g</code>, or{" "}
          <code>&lt;leader&gt;gg</code> in nvim):
        </p>
        <KeyTable
          headers={["Key", "Action"]}
          rows={[
            ["`space`", "stage / unstage file or hunk"],
            ["`a`", "stage all"],
            ["`c`", "commit (C for full editor)"],
            ["`P` / `p`", "push / pull"],
            ["`b`", "branches view · space to checkout"],
            ["`<` `>`", "older/newer commit · Enter to inspect"],
            ["`d`", "diff/discard menu · z/Z undo/redo"],
            ["`?`", "help (every panel has its own keys)"],
          ]}
        />
        <p>
          <code>git diff</code>, <code>git show</code>,{" "}
          <code>git log -p</code> all render through <strong>delta</strong>{" "}
          (syntax highlighting, line numbers). <code>git lg</code> = pretty
          graph; <code>git sync</code> = <code>pull --rebase &amp;&amp; push</code>.
        </p>

        <Heading id="cli-reference">9. CLI quick reference</Heading>
        <CodeBlock
          code={`bat file.go               # cat with syntax + line numbers (paged)
eza -la --git             # ls with icons + git status   (abbr: la)
fd pattern                # find files (respects .gitignore)
rg pattern                # grep (fast, .gitignore-aware)
rg pattern -t go          # only Go files
btop                      # system monitor (abbr: top)
gh pr create / gh pr view # GitHub from the terminal
tldr <cmd>                # concise example-first help
atuin search <q>          # query shell history from CLI`}
        />

        <Heading id="maintenance">10. Maintenance</Heading>
        <CodeBlock
          code={`cd ~/flightdeck && git pull       # get updates
./install.sh                      # re-apply (idempotent)
stow -t ~ <package>               # link one package
stow -D -t ~ <package>            # unlink one package
brew bundle --file=~/flightdeck/Brewfile   # sync packages

# Neovim
:Lazy        # plugin manager (U = update, S = sync, x = clean)
:Mason       # LSP/formatter/linter installer
:checkhealth # diagnose issues
:LazyExtras  # toggle language/feature extras

# tmux
prefix I     # install plugins   ·  prefix U = update   ·  prefix r = reload`}
        />
        <p>
          <strong>Secrets:</strong> put API keys in{" "}
          <code>~/.config/fish/conf.d/secret.fish</code> (gitignored).{" "}
          <strong>Backups:</strong> the installer saves previous configs to{" "}
          <code>~/.dotfiles-backup-&lt;timestamp&gt;/</code>.
        </p>

        <hr />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          This workflow is built on{" "}
          <a
            href="https://github.com/vndee/flightdeck"
            target="_blank"
            rel="noopener noreferrer"
          >
            flightdeck
          </a>{" "}
          by Duy Huynh (MIT licensed).
        </p>
      </div>

      <BackToTop />
    </section>
  );
}
