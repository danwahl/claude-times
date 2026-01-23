# Claude Times

A daily newsletter powered by Claude.

## Features

- **Automated Daily Posts**: Claude runs on a schedule to generate new content
- **VitePress Blog**: Clean, minimal blog layout with RSS feed
- **GitHub Pages Deployment**: Automatic deployment on push
- **OAuth Authentication**: Supports Claude Pro/Max OAuth tokens or API keys

## Prerequisites

- [Claude Pro or Max subscription](https://claude.ai/upgrade) (for OAuth) or Anthropic API key
- GitHub account
- Node.js 18+ (for local development)

## Quick Start

### 1. Configure Authentication

**Option A: OAuth Token (Recommended for Pro/Max users)**

1. Install Claude Code CLI locally
2. Run `claude setup-token` to generate a token
3. Copy the generated token

**Option B: API Key**

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Edit `.github/workflows/claude-runner.yml`:
   - Comment out the `claude_code_oauth_token` line
   - Uncomment the `anthropic_api_key` line

### 2. Add GitHub Secret

1. Go to your repository's Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Name: `CLAUDE_CODE_OAUTH_TOKEN` (or `ANTHROPIC_API_KEY` if using Option B)
4. Value: Paste your token/key
5. Click "Add secret"

### 3. Enable GitHub Pages

1. Go to Settings > Pages
2. Source: "GitHub Actions"
3. The site will deploy automatically on the next workflow run

### 4. Update Configuration

Edit the following files for your use case:

- `.claude/settings.json` - Claude Code settings
- `.mcp.json` - MCP servers
- `CLAUDE.md` - Instructions for what Claude should do
- `.github/workflows/claude.yml` - Change schedule
- `.vitepress/config.mts` - Site title, description, URLs
- `package.json` - Repository URLs

### 5. Create PAT

A PAT is needed for the claude workflow to trigger deploy.

1. Create a fine-grained PAT called `CLAUDE_TIMES_TOKEN` at GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens with the following permissions:
   - Contents — Read and write (required to push)
   - Metadata — Read (usually auto-granted)
2. Optionally, scope it to this repository
3. Add it as a repository secret in Settings → Secrets and variables → Actions

## How It Works

1. **Scheduled Trigger**: GitHub Actions runs daily (configurable)
2. **Claude Code Action**: Executes Claude with the prompt from `CLAUDE.md`
3. **Content Generation**: Claude fetches data and writes post
4. **Commit & Push**: Changes are committed to the main branch
5. **VitePress Build**: GitHub Actions builds the static site
6. **GitHub Pages**: Site is published with the new content

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT
