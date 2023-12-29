import { compose } from "react-declarative";
import { t } from "../locale/t";
import { throttle } from "lodash";

const MUTATION_DEBOUNCE = 1;

const mutations: Function[] = [
  // Input placeholders
  () => {
    document.querySelectorAll("input").forEach((input) => {
      if (input.placeholder) {
        input.placeholder = t(input.placeholder);
      }
    });
  },
  // Textarea placeholders
  () => {
    document.querySelectorAll("textarea").forEach((textarea) => {
      if (textarea.placeholder) {
        textarea.placeholder = t(textarea.placeholder);
      }
    });
  },
];

const dom_patch = () => {
  const pipeline = throttle(
    compose(...mutations.map((callback) => () => void callback())),
    MUTATION_DEBOUNCE,
    {
      trailing: true,
    }
  );

  const observer = new MutationObserver(pipeline);

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

document.addEventListener("DOMContentLoaded", dom_patch);
