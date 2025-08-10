<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <button @click="close" class="close-btn">Close</button>
      <div ref="viewerRef" class="pdf-viewer"></div>
    </div>
  </div>
</template>

<script setup>
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js?url";
import { ref, watch, nextTick, defineExpose } from "vue";

// ✅ Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const props = defineProps({
  pdfUrl: { type: String, required: true },
  modelValue: { type: Boolean, required: true }, // for v-model
});

const disableContextMenu = () => {
  if (!viewerRef.value) return;

  // Prevent right-click
  viewerRef.value.addEventListener("contextmenu", (e) => e.preventDefault());

  // Prevent drag events
  viewerRef.value.addEventListener("dragstart", (e) => e.preventDefault());
};

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const viewerRef = ref(null);

const open = async () => {
  isOpen.value = true;
  emit("update:modelValue", true);
  await nextTick();
  await renderPDF(props.pdfUrl);
};

const close = () => {
  isOpen.value = false;
  emit("update:modelValue", false);
  if (viewerRef.value) viewerRef.value.innerHTML = "";
};

watch(
  () => props.modelValue,
  (val) => {
    if (val) open();
    else close();
  }
);

const renderPDF = async (url) => {
  if (!viewerRef.value) return;

  viewerRef.value.innerHTML = ""; // clear existing canvas

  try {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // 🚫 Disable right-click & dragging for this canvas
      canvas.addEventListener("contextmenu", (e) => e.preventDefault());
      canvas.addEventListener("dragstart", (e) => e.preventDefault());

      viewerRef.value.appendChild(canvas);

      await page.render({ canvasContext: context, viewport }).promise;
    }
  } catch (err) {
    console.error("PDF load error:", err);
  }
};

// optional expose for parent component to call `open()`
defineExpose({ open, close });
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 1rem;
  width: 90%;
  height: 90%;
  overflow-y: auto;
  border-radius: 8px;
  position: relative;
}
.pdf-viewer canvas {
  display: block;
  margin: 1rem auto;
  border: 1px solid #ccc;
  pointer-events: none; /* 🚫 disables click/hover entirely */
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 14px;
  background: crimson;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
