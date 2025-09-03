# Contributing to Modern SvelteKit Webshop

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Git

### Local Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/webshop-sveltekit.git
   cd webshop-sveltekit
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:5173`

## 🔄 Development Workflow

### Branch Naming Convention

- `feature/feature-name` - for new features
- `fix/fix-name` - for bug fixes
- `docs/documentation-update` - for documentation changes
- `refactor/refactor-name` - for code refactoring

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation
- `style`: formatting
- `refactor`: code restructuring
- `test`: adding tests
- `chore`: maintenance

**Examples:**
```
feat(cart): add persistent cart functionality
fix(product): resolve image loading issue
docs(readme): update installation instructions
```

## 🎨 Code Style

### Linting and Formatting

This project uses ESLint and Prettier for code quality:

```bash
# Check linting
npm run lint

# Format code
npm run format

# Type checking
npm run check
```

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper types for function parameters and return values
- Use interfaces for complex objects
- Avoid `any` type when possible

### Svelte Component Structure

```svelte
<script lang="ts">
  // Imports
  import { onMount } from 'svelte';

  // Props with proper typing
  export let title: string;
  export let items: Item[];

  // Reactive statements
  $: filteredItems = items.filter(item => item.active);

  // Functions
  function handleClick() {
    // Implementation
  }
</script>

<!-- Template -->
<div class="container">
  <h1>{title}</h1>
  {#each filteredItems as item}
    <div on:click={handleClick}>
      {item.name}
    </div>
  {/each}
</div>

<style>
  /* Component-specific styles */
</style>
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run unit tests only
npm run test:unit
```

### Writing Tests

- Place test files next to the code they test
- Use `.test.ts` or `.spec.ts` extension
- Follow the existing test patterns
- Ensure good test coverage for new features

### Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(2500, 'EUR')).toBe('€25.00');
  });

  it('should handle zero price', () => {
    expect(formatPrice(0, 'USD')).toBe('$0.00');
  });
});
```

## 📝 Submitting Changes

### Pull Request Process

1. **Update your fork** with the latest changes from main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and ensure:
   - Code follows the style guidelines
   - Tests pass
   - No linting errors
   - Documentation is updated

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Screenshots/videos if UI changes
   - Reference to any related issues

### Pull Request Checklist

- [ ] Tests pass
- [ ] Code is linted and formatted
- [ ] TypeScript compilation succeeds
- [ ] No console errors or warnings
- [ ] Documentation is updated
- [ ] Breaking changes are documented
- [ ] Commit messages follow the convention

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment info:**
   - Browser and version
   - Operating system
   - Node.js version
5. **Screenshots/videos** if applicable
6. **Console errors** or logs

### Feature Requests

For feature requests, please include:

1. **Clear title** for the feature
2. **Detailed description** of the proposed feature
3. **Use case** - why is this feature needed?
4. **Implementation ideas** if you have any
5. **Mockups/screenshots** if applicable

## 📚 Additional Resources

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte Documentation](https://svelte.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Stripe Documentation](https://stripe.com/docs)

## 🙏 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

---

Thank you for contributing to the Modern SvelteKit Webshop! 🎉
