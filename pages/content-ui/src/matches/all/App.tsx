import { getActiveVocabulary } from '@src/vocabulary';
import { useEffect } from 'react';
import type { VocabularyItem } from '@src/vocabulary';

interface WordReplacement {
  id: string;
  originalWord: string;
  replacementWord: string;
  node: Text;
  offset: number;
}

export default function App() {
  useEffect(() => {
    console.log('[CEB] Word replacement content UI loaded');

    // Load vocabulary items (will be from database in the future)
    const vocabularyItems = getActiveVocabulary();

    if (vocabularyItems.length === 0) {
      console.warn('[CEB] No active vocabulary items found');
      return;
    }

    console.log(
      `[CEB] Loaded ${vocabularyItems.length} vocabulary items:`,
      vocabularyItems.map(v => `"${v.from}" → "${v.to}"`).join(', '),
    );

    // Ensure a global overlay container for tooltips exists
    let overlay = document.getElementById('ceb-translation-overlay') as HTMLDivElement | null;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'ceb-translation-overlay';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0 0 auto 0';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '2147483647';
      document.body.appendChild(overlay);
    }

    // Build a combined regex pattern for all vocabulary words
    // Use negative lookahead to prevent matching plurals or compound words
    const buildPatternSource = (items: VocabularyItem[]) => {
      const words = items.map(item => item.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // escape regex chars
      // Match whole word only, not followed by letters (prevents "project" matching "projects")
      return `\\b(${words.join('|')})\\b(?![a-zA-Z])`;
    };

    const patternSource = buildPatternSource(vocabularyItems);

    // Create a NON-global regex for .test() checks (avoids lastIndex state issues)
    const testPattern = new RegExp(patternSource, 'i');

    // Factory to create fresh global regex for .exec() loops (each call resets lastIndex)
    const createMatchPattern = () => new RegExp(patternSource, 'gi');

    // Create a lookup map for O(1) vocabulary lookups
    const vocabMap = new Map<string, VocabularyItem>();
    vocabularyItems.forEach(item => {
      vocabMap.set(item.from.toLowerCase(), item);
    });

    // Function to find and replace words from vocabulary list
    const findAndReplaceWords = () => {
      console.log('[CEB] Finding words to translate...');
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: node => {
          // Skip script, style, and our own elements
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          const tagName = parent.tagName.toLowerCase();
          if (tagName === 'script' || tagName === 'style' || tagName === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }

          // Skip if already processed or inside our shadow root/overlay or chip
          if (
            parent.closest('#CEB-extension-all') ||
            parent.closest('#ceb-translation-overlay') ||
            parent.closest('.ceb-word-chip')
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          // Ignore editable/inputs
          if (
            tagName === 'input' ||
            tagName === 'textarea' ||
            parent.isContentEditable ||
            parent.closest('[contenteditable="true"]')
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          // Check if text contains any vocabulary words
          // Use non-global testPattern to avoid lastIndex state issues
          if (node.textContent && testPattern.test(node.textContent)) {
            return NodeFilter.FILTER_ACCEPT;
          }

          return NodeFilter.FILTER_REJECT;
        },
      });

      const foundReplacements: WordReplacement[] = [];
      let textNode: Node | null;

      while ((textNode = walker.nextNode())) {
        const text = textNode.textContent || '';
        // Create fresh global regex for each node (ensures lastIndex starts at 0)
        const regex = createMatchPattern();
        let match;

        while ((match = regex.exec(text)) !== null) {
          const matchedWord = match[1];
          const vocabItem = vocabMap.get(matchedWord.toLowerCase());

          if (vocabItem) {
            foundReplacements.push({
              id: `${Date.now()}-${Math.random()}`,
              originalWord: matchedWord,
              replacementWord: vocabItem.to,
              node: textNode as Text,
              offset: match.index,
            });
          }
        }
      }

      // Process replacements in reverse order to maintain correct offsets
      foundReplacements.reverse().forEach(replacement => {
        const { node, offset, originalWord, replacementWord } = replacement;
        const text = node.textContent || '';

        // Get the vocab item for translation info
        const vocabItem = vocabMap.get(originalWord.toLowerCase());
        if (!vocabItem) return;

        // Split the text node at the word position
        const beforeText = text.substring(0, offset);
        const afterText = text.substring(offset + originalWord.length);

        // Create a span element for the chip
        const chip = document.createElement('span');
        chip.className = 'ceb-word-chip';
        chip.textContent = replacementWord;
        chip.setAttribute('data-original', originalWord);
        chip.setAttribute('data-translation-from', vocabItem.fromLang);
        chip.setAttribute('data-translation-to', vocabItem.toLang);
        chip.style.cssText = `
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          margin: 0 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 6px;
          font-size: 0.875em;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
          cursor: help;
          position: relative;
        `;

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'ceb-translation-tooltip';
        tooltip.innerHTML = `
          <div style="font-weight: 600; margin-bottom: 8px; font-size: 11px; color: #a78bfa; letter-spacing: 0.3px;">
            ${vocabItem.fromLang} → ${vocabItem.toLang}
          </div>
          <div style="font-size: 14px; display: flex; align-items: center; gap: 10px;">
            <span style="opacity: 0.9;">"${originalWord}"</span>
            <span style="opacity: 0.8;">→</span>
            <span style="display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600;">"${replacementWord}"</span>
          </div>
        `;
        tooltip.style.cssText = `
          position: fixed;
          bottom: auto;
          left: auto;
          transform: translateX(-50%) translateY(-100%);
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
          color: white;
          padding: 14px 20px;
          border-radius: 8px;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease;
          z-index: 2147483647;
          border: 1px solid rgba(167, 139, 250, 0.3);
        `;

        // Add arrow to tooltip
        const arrow = document.createElement('div');
        arrow.style.cssText = `
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #1e1b4b;
        `;
        tooltip.appendChild(arrow);
        // appended on hover

        // Add hover effects with dynamic positioning
        const positionTooltip = () => {
          const rect = chip.getBoundingClientRect();
          tooltip.style.left = `${Math.round(rect.left + rect.width / 2)}px`;
          tooltip.style.top = `${Math.round(rect.top - 8)}px`;
        };

        const onScrollOrResize = () => positionTooltip();

        chip.addEventListener('mouseenter', () => {
          positionTooltip();
          chip.style.transform = 'scale(1.05)';
          chip.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
          overlay!.appendChild(tooltip);
          tooltip.style.opacity = '1';
          window.addEventListener('scroll', onScrollOrResize, true);
          window.addEventListener('resize', onScrollOrResize);
        });
        chip.addEventListener('mouseleave', () => {
          chip.style.transform = 'scale(1)';
          chip.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          tooltip.style.opacity = '0';
          tooltip.remove();
          window.removeEventListener('scroll', onScrollOrResize, true);
          window.removeEventListener('resize', onScrollOrResize);
        });

        // Create new text nodes
        const beforeNode = document.createTextNode(beforeText);
        const afterNode = document.createTextNode(afterText);

        // Replace the original text node with the new structure
        const parent = node.parentNode;
        if (parent) {
          parent.insertBefore(beforeNode, node);
          parent.insertBefore(chip, node);
          parent.insertBefore(afterNode, node);
          parent.removeChild(node);
        }
      });

      // Log translation summary
      const summary = foundReplacements.reduce(
        (acc, r) => {
          const key = `${r.originalWord.toLowerCase()}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      console.log(`[CEB] Translated ${foundReplacements.length} words:`, summary);
    };

    // Initial replacement
    findAndReplaceWords();

    // Observe DOM changes for dynamically loaded content
    const observer = new MutationObserver(mutations => {
      let shouldReplace = false;

      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            // Skip our own elements
            if (
              node instanceof Element &&
              !node.closest('#CEB-extension-all') &&
              !node.closest('#ceb-translation-overlay') &&
              !node.closest('.ceb-word-chip')
            ) {
              shouldReplace = true;
            }
          });
        }
      });

      if (shouldReplace) {
        // Debounce replacements
        setTimeout(findAndReplaceWords, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything visible - it works by manipulating the DOM
  // We need to return something for React to mount the component and run the useEffect
  return <div style={{ display: 'none' }} data-word-replacer="active" />;
}
