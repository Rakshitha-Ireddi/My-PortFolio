'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// theme toggle (dark / light) variables
const rootEl = document.documentElement;
const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

const applyTheme = function (theme) {
  if (theme === "light") {
    rootEl.setAttribute("data-theme", "light");
    themeIcon.setAttribute("name", "moon-outline");
  } else {
    rootEl.removeAttribute("data-theme");
    themeIcon.setAttribute("name", "sunny-outline");
  }
}

// apply saved theme, falling back to the visitor's system preference
const storedTheme = localStorage.getItem("portfolio-theme");
const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(storedTheme || (prefersLight ? "light" : "dark"));

themeToggleBtn.addEventListener("click", function () {
  const isLight = rootEl.getAttribute("data-theme") === "light";
  const nextTheme = isLight ? "dark" : "light";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});



// timeline: click any heading (Education, Experience, Research, Leadership,
// Achievements) for a small "pop" highlight animation
const timelineTitles = document.querySelectorAll(".timeline-item-title");

for (let i = 0; i < timelineTitles.length; i++) {
  const triggerPop = function () {
    const item = this.closest(".timeline-item");

    item.classList.remove("pop");
    this.classList.remove("pop-text");
    void item.offsetWidth; // restart animation on repeat clicks

    item.classList.add("pop");
    this.classList.add("pop-text");
  };

  timelineTitles[i].addEventListener("click", triggerPop);
  timelineTitles[i].addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerPop.call(this);
    }
  });
}



// skills: mirror-shine sweep on tap/click (hover handles desktop cursor via CSS)
const skillTags = document.querySelectorAll(".tag");

for (let i = 0; i < skillTags.length; i++) {
  skillTags[i].addEventListener("click", function () {
    this.classList.remove("shine");
    void this.offsetWidth; // restart animation on repeat clicks
    this.classList.add("shine");
  });
}


// portfolio: click a project card to open a popup with its summary and links
const projectData = {
  fintrack: {
    title: "FinTrack",
    status: "Full-stack · Finance",
    tech: "Java · Spring Boot · React · PostgreSQL · JWT · REST APIs · Docker · AWS",
    text: "A full-stack financial management platform with expense tracking, budgeting, and automated spending insights, including authentication, transaction APIs, and real-time dashboards.",
    links: [{ label: "GitHub", url: "https://github.com/Rakshitha-Ireddi/FinTrack---Finance-and-Expense-Intelligence-Platform" }]
  },
  secureauth: {
    title: "SecureAuth",
    status: "Security · Identity & Access",
    tech: "Spring Boot · Spring Security · Redis · PostgreSQL · Docker · Kubernetes",
    text: "A centralized identity and access management platform with role-based access control, multi-factor authentication, and token-based session security, backed by scalable, cached APIs for secure multi-application access.",
    links: [{ label: "GitHub", url: "https://github.com/Rakshitha-Ireddi/secureauth-iam" }]
  },
  datapulse: {
    title: "DataPulse",
    status: "Data Engineering · Real-time analytics",
    tech: "Python · Kafka · PySpark · Airflow · PostgreSQL · MongoDB · Docker",
    text: "A real-time customer analytics platform using Kafka ingestion pipelines and Spark processing to generate trend analysis and personalized recommendations at scale.",
    links: [{ label: "GitHub", url: "https://github.com/Rakshitha-Ireddi/DataPulse" }]
  },
  insightai: {
    title: "InsightAI",
    status: "AI / ML · Retrieval-Augmented Generation",
    tech: "Python · LangChain · OpenAI API · HuggingFace · FAISS · ChromaDB · FastAPI · PostgreSQL",
    text: "An AI-powered RAG assistant that answers questions from enterprise documents using HuggingFace embeddings and FAISS/ChromaDB vector search, with conversational memory for context-aware responses.",
    links: [{ label: "GitHub", url: "https://github.com/Rakshitha-Ireddi/InsightAI" }]
  },
  lob: {
    title: "LOB Matching Engine",
    status: "Systems · Low-latency C++ · arXiv preprint",
    tech: "C++17/20 · Linux · Multithreading · TCP/UDP · CMake · GoogleTest",
    text: "A price-time-priority limit order book and matching engine in C++, built as an open, reproducible study of three order-book data structures behind identical, differentially-tested matching logic. Rankings invert between Windows and Linux, mostly as an allocator effect, and the engine runs 1.6 to 2.4 times faster than the open-source OCI liquibook with a 3 to 5 times tighter tail latency.",
    links: [
      { label: "GitHub", url: "https://github.com/Rakshitha-Ireddi/Lob-matching-engine" },
      { label: "Paper · arXiv preprint, September 2026", url: "" }
    ]
  }
};

const pmOverlay = document.querySelector("[data-pm-overlay]");
const pmStatus = document.querySelector("[data-pm-status]");
const pmTitle = document.querySelector("[data-pm-title]");
const pmTech = document.querySelector("[data-pm-tech]");
const pmText = document.querySelector("[data-pm-text]");
const pmLinks = document.querySelector("[data-pm-links]");

const openProject = function (key) {
  const p = projectData[key];
  if (!p) return;

  pmStatus.textContent = p.status;
  pmTitle.textContent = p.title;
  pmTech.textContent = p.tech;
  pmTech.hidden = false;
  pmTech.hidden = false;
  pmText.textContent = p.text;

  pmLinks.textContent = "";
  p.links.forEach(function (l) {
    const li = document.createElement("li");
    let el;
    if (l.url) {
      el = document.createElement("a");
      el.href = l.url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.className = "pm-link";
    } else {
      el = document.createElement("span");
      el.className = "pm-link pm-link-static";
    }
    el.textContent = l.label;
    li.appendChild(el);
    pmLinks.appendChild(li);
  });
  pmLinks.hidden = p.links.length === 0;

  pmOverlay.classList.add("open");
};

const closeProject = function () { pmOverlay.classList.remove("open"); };

document.querySelectorAll("[data-project]").forEach(function (card) {
  card.addEventListener("click", function () { openProject(card.dataset.project); });
});

pmOverlay.addEventListener("click", function (e) { if (e.target === pmOverlay) closeProject(); });
document.querySelector("[data-pm-close]").addEventListener("click", closeProject);
document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeProject(); });


// research: click a publication card for its details (no link opens from the card itself)
const pubData = {
  "mveb": {
    "title": "MVEB: Massive Video Embedding Benchmark",
    "status": "arXiv, 2026 · Preprint · with Stanford, CMU & Harvard",
    "text": "We introduce the Massive Video Embedding Benchmark (MVEB), a 23-task benchmark for video embeddings spanning classification, zero-shot classification, clustering, pair classification, retrieval, and video-centric question answering. We evaluate 33 models and find that no single model dominates: MLLM-based embeddings lead on classification, clustering, pair classification, and QA; multimodal binding leads on retrieval and zero-shot classification; generative MLLMs without contrastive adaptation collapse on cross-modal tasks. Paired video-only vs. audio+video evaluations show that audio's contribution depends on dataset annotation provenance: audio helps when labels were produced from both modalities and hurts when they were produced from visuals alone, a six-point gap consistent across model families. MVEB is derived from MVEB+, a 184-task pool, and is designed to maintain task diversity while reducing evaluation cost. It integrates into the MTEB ecosystem for unified evaluation across text, image, audio, and video. We release MVEB and all 184 tasks along with code and a leaderboard.",
    "links": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=IzkudxkAAAAJ&hl=en"
      }
    ]
  },
  "looking-glass": {
    "title": "Through the Looking Glass: Benchmarking Mirror Image Reasoning in Vision-Language Models",
    "status": "Accepted at CVPR Workshop 2026",
    "text": "When a clock reads 2:50 in a mirror, humans instantly infer the true time is 9:10 — yet we show that current Vision-Language Models (VLMs) overwhelmingly report \"2:50,\" hallucinating the canonical orientation rather than reasoning about the reflection. We term this systematic failure reflection blindness and introduce our benchmark, the first designed to diagnose it. It comprises 713 real-world images and 3,529 question-answer pairs spanning 10 scenario categories (license plates in rear-view mirrors, analog clocks, hands, ears, shoes, chemical formulas, ambulance mirror-text, selfie cameras, water reflections, and indoor mirrors), organized into five question types: recognition, correction, spatial, reasoning, and comparison. Evaluating 11 VLMs in both single-turn and multi-turn settings, we find that all models achieve only 39–48% accuracy (single-turn) versus 94% for humans, with frontier systems clustered at 42–44% and performance collapsing most severely on tasks requiring mental un-flipping of text and left–right chirality judgment. Multi-turn dialogue does not improve performance; most models degrade by 1–14 percentage points when questions are posed sequentially.",
    "links": []
  },
  "trace": {
    "title": "TRACE: Verifiable RL Environment for Network Troubleshooting Agents",
    "status": "NeurIPS Workshop 2026 · Submitted",
    "text": "Small language models (SLMs) are increasingly proposed as the right substrate for narrow, repetitive agentic sub-tasks, but demonstrating that an SLM can be trained into a competent tool-using agent requires a domain where the environment itself can verify success. Network troubleshooting is such a domain: an agent must connect a sparse alert to hidden protocol state, gather evidence through telemetry tools, and apply a repair whose success the environment can check directly. We present TRACE, a verifiable benchmark and reinforcement-learning environment for tool-using language agents in network troubleshooting. TRACE combines a pure-Python simulator for OSPF and BGP protocol state, a 54-fault catalog spanning 11 operational failure categories, four topology variants, and an episode protocol that rewards correct diagnosis, component localization, repair, and efficiency. The environment starts in roughly 0.1s without root privileges or network emulation, making it fast enough for repeated agent evaluation and on-policy RL on commodity hardware. In a zero-shot evaluation of 13 instruction-tuned models on 54 stratified episodes, the best model resolves only 44% of incidents, the weakest resolves none, and 23 of 54 fault types are unsolved by every model tested. We then instantiate TRACE as a training environment for a 1.7B-parameter open SLM (Qwen3-1.7B): we distill 371 successful expert trajectories from a frontier teacher, apply LoRA supervised fine-tuning, and follow with Group Relative Policy Optimization (GRPO) against the live simulator's verifiable reward. The two-stage pipeline runs end-to-end on a single 4GB consumer GPU and doubles the SLM's overall solve rate (3.7% → 7.4%) while tripling its solve rate on Hard faults (4% → 12.5%), showing that a small open model can acquire non-trivial diagnostic tool-use skill from a verifiable, simulator-checked reward without a learned reward model or human preference labels.",
    "links": []
  },
  "apishift": {
    "title": "APISHIFT: Verifiable Agent Learning for API Contract Migration",
    "status": "NeurIPS Workshop 2026 · Submitted",
    "text": "LLM code assistants are powerful but fundamentally untrustworthy: they hallucinate logic, mishandle corner cases, and give no guarantee that a generated artifact is correct. We study a setting where that gap can be narrowed without a full proof calculus: API contract migration, where a vendor changes an API's formal specification (OpenAPI) and a client codebase must be repaired, tested for backward compatibility, and left with a reversible rollback path. We introduce APISHIFT, a verifiable environment in which a trainable manager agent proposes structured JSON actions and four deterministic specialist verifiers — Diff, Patch, Test, Rollback — check, score, or certify each proposal, instantiating the propose→refute→repair→certify loop central to verifiable coding. APISHIFT contains 1,549 real (v1, v2) API version pairs from 449 production providers spanning ten breaking-change types, scored by a five-component machine-checked reward. Zero-shot evaluation across 20 models shows that constrained-output adherence, not model scale, determines success on clean scenarios: Llama-3.2-1B reaches a 100% verified solve rate, matching frontier models, while a 32B reasoning model scores 0% because it emits unconstrained chain-of-thought instead of schema-valid actions. A complementary 50-pair real-world evaluation shows the opposite trend: wild, multi-change specifications require model capacity (Llama-3.3-70B: 98% vs. Llama-3.2-1B: 10%), motivating RL under verifier-derived reward. As a first training baseline we fine-tune Qwen2.5-3B with GRPO and LoRA on a single RTX 3090 GPU and report a negative result: training peaks at reward 0.434 (step 400) before collapsing from within-batch reward-variance collapse under an all-or-nothing verified reward. We diagnose this failure precisely, identify partial-credit shaping and curriculum ordering as repair directions, and release the environment, dataset, and training infrastructure.",
    "links": []
  },
  "cryo-agent": {
    "title": "CRYO-AGENT: Agentic Cryo-ET Reconstruction with Physics-Guided Retrieval-Augmented Diffusion",
    "status": "ECCV Workshop 2026 · Submitted",
    "text": "Cryo-electron tomography (cryo-ET) is the gold standard for in situ structural biology, providing a unique window into macromolecular complexes within their native cellular environments. However, the technique is fundamentally limited by low signal-to-noise ratio and the \"missing wedge\" artifact, which induces anisotropic distortions and structural hallucinations that current feed-forward denoising methods fail to rigorously validate. CRYO-AGENT redefines 3D reconstruction as an autonomous, iterative scientific discovery loop: we orchestrate a Planner–Executor–Critic workflow where the Executor uses Retrieval-Augmented Cyclic Diffusion (RAD) to inject high-fidelity 3D atomic priors from the Protein Data Bank directly into the reconstruction process. By integrating a Critic agent with a differentiable physics simulator, CRYO-AGENT significantly reduces missing-wedge artifacts and achieves a high Hallucination Rejection Rate compared to state-of-the-art baselines. While the iterative agentic orchestration introduces higher computational latency than linear models, it ensures strict adherence to the underlying physical data — providing a robust pathway for resolving precise conformational states of proteins in noisy tomograms, and showcasing how vision-language reasoning and retrieval-augmented diffusion can solve complex inverse problems in the natural sciences.",
    "links": []
  },
  "da-llm": {
    "title": "Can Large Language Models Autonomously Perform Decision Analysis? Where the Boundary Lies, on a Classical Influence Diagram",
    "status": "Stanford University · Ongoing, 2026",
    "text": "Can a large language model autonomously perform decision analysis? We test seven models from four providers on the Oil Wildcatter influence diagram, a classical problem whose every answer is known exactly and independently of any model. The answer depends on where the computation is done. Computed in context, narrow single-step tasks are reliable once a previously unrecognized structured-output defect is fixed (a reasoning field must precede the numeric answer), but integration across steps fails through several distinct mechanisms, and one representation makes a step numerically ill-conditioned: with power utility written on absolute wealth, the certainty-equivalent inversion at Oil Wildcatter's operating point amplifies a relative error of 10⁻⁴ into a 126% error, so no prompt can repair it, whereas the same preferences written as a function of the gain from current wealth are well conditioned.\n\nDelegated to code, the picture changes. Across the seven models, writing a program yields a fully correct top-down answer in 82% of runs versus 39% answering directly (60% under a looser tolerance); given only a natural-language specification, the four strongest models wrote a correct solver passing 29 ground-truth tests in 20 of 20 attempts, and formulated four plain-English decision problems correctly in 128 of 128 runs. What remains are silent specification errors: chiefly treating a sunk cost as decision-relevant (21 of 32 formulation runs for DeepSeek; GPT-4o's power-utility code applies the invalid shortcut in 3 of 5 attempts) and failing to invert a reversed probability (GPT-4o, 0 of 8).\n\nWe conclude that the boundary lies not in arithmetic but in specification and verification, and offer a design principle: the model supplies judgment, code computes, and exact checks verify.",
    "links": []
  },
  "sr-lora": {
    "title": "SR-LoRA: Parameter-Efficient Fine-Tuning for Agentic Reasoning",
    "status": "CMU · Ongoing, 2026",
    "text": "Extending parameter-efficient fine-tuning methods for agentic reasoning models. Current work in progress, alongside related work on Agentic VAD.",
    "links": []
  },
  "edgemedbench": {
    "title": "EdgeMedBench: Benchmarking Small Language Models for Medical QA",
    "status": "IC4AI'26 · VIT-AP University",
    "text": "A benchmark for evaluating Small Language Models on medical question answering under resource-constrained conditions, exploring quantization for compression, latency under real edge constraints, and deployability on limited hardware, backed by a thorough ablation study.",
    "links": []
  },
  "sdn-ddos": {
    "title": "ML-Based SDN DDoS Detection: Machine Learning–Enabled Intrusion Detection System",
    "status": "CIMA '26 · Published",
    "text": "Software-Defined Networking (SDN) decouples the control plane from the data plane, fostering centralized control and enhanced programmability for better network management. This architectural flexibility, while improving scalability and operational efficiency, exposes new attack surfaces increasingly exploited by adversaries — particularly targeting the centralized SDN controller. Among these threats, DDoS (specifically SYN Flood) presents a major security concern due to the risk of overwhelming the network through a flood of requests to the controller. We conduct a comparative assessment of several machine learning algorithms — Random Forest, XGBoost, Artificial Neural Networks, and Decision Tree — to detect attack types including Brute Force, DoS, DDoS, Probe, and User-to-Root attacks, using features readily available at the SDN controller so as to avoid computationally expensive deep packet inspection. Evaluated on the CICIDS-2017 dataset, the proposed framework achieves high detection accuracy with minimal false alarms across all attack classes, with the Random Forest ensemble performing best in accuracy, precision, recall, and F1-score — demonstrating a lightweight, efficient system suitable for real-time security monitoring in SDNs.",
    "links": []
  },
  "solar": {
    "title": "Revolutionizing Solar Generation Data Mining through Advanced Machine Learning Algorithms: Novel Insights and Results",
    "status": "IEEE · CSITSS 2023 · Published · with S.P. Siddique Ibrahim, T. Vasisri, R. Hima Aswitha, M. Ramachandra Rao, D. Vamsi Krishna",
    "text": "Solar power generation has emerged as a significant source of renewable energy, emphasizing the importance of precise analysis and prediction of solar generation data. This study focuses on enhancing the accuracy of solar generation data mining using advanced machine learning techniques, capturing intricate patterns and variations in the data while considering environmental factors. We propose a novel algorithm leveraging feature engineering and ensemble learning methods, and through extensive experimentation demonstrate superior predictive performance compared to conventional approaches — contributing to more accurate forecasting and decision-making for efficient renewable energy utilization.",
    "links": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=IzkudxkAAAAJ&hl=en"
      }
    ]
  },
  "cervical": {
    "title": "Comparative Analysis of Machine Learning Algorithms for Cervical Cancer Prediction",
    "status": "Springer Nature · ICACECS 2023 · Published · with T. Vasisri, M. Anusha, M. Sucharitha",
    "text": "Cervical cancer constitutes a significant public health concern, and early diagnosis plays an important role in the patient's recovery. In this study, we investigated the utilization of various machine learning algorithms to predict cancer with the best accuracy. The objective was to identify the most reliable predictors of cervical cancer through comparative analysis, using medical and demographic characteristics of different patients. The data was prepared by addressing missing values, normalizing features, and resolving intra-class imbalance. We used SVM, K-NN, Decision Tree, Random Forest, and XGBoost, evaluated on precision, accuracy, recall, and AUC-ROC. Among all models used, XGBoost achieved the highest accuracy of 99.22%. These findings provide valuable insights to researchers, physicians, and policy makers toward enhancing care and mitigating the global impact of cervical cancer.",
    "links": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=IzkudxkAAAAJ&hl=en"
      }
    ]
  },
  "anime": {
    "title": "Anime Visage: Revealing Ingenuity with GAN-Assisted Character Development",
    "status": "IEEE ICOECA 2024 · Published · with U. Nithin, S.M.A. Kareem, V.N.S. Rahul, N.P. Challa, B. Naseeba",
    "text": "This research explores the fusion of creative ingenuity and machine learning, utilizing Generative Adversarial Networks (GANs) to revolutionize anime character creation. Collaborating with artists, the study employs GANs to automate the generation of diverse and aesthetically pleasing anime faces, addressing the intricate details unique to the art style. Initial findings show the model capturing fine nuances inherent in anime artistry, streamlining a labor-intensive manual process while preserving the anime aesthetic's integrity — marking a more efficient and diversified approach to anime character design.",
    "links": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=IzkudxkAAAAJ&hl=en"
      }
    ]
  },
  "tsunami": {
    "title": "Unleashing Machine Wisdom: A Glimpse Into AI-Powered Tsunami Early Warning Systems",
    "status": "Book Chapter · IGI Global Scientific Publishing, 2024 · in \"Utilizing AI and Machine Learning for Natural Disaster Management\" · with U. Nithin, L. Namratha, M.A.K. Shaik, S. Ibrahim",
    "text": "This chapter scrutinizes the potential of AI-driven tsunami early warning systems (TEWS), focused on the catastrophic potential of tsunamis. It charts a roadmap spotlighting artificial neural networks (ANN) and convolutional neural networks (CNN), guiding stakeholders from theoretical frameworks toward actionable strategies. Beyond technical intricacies, it emphasizes the transformative impact of proactive disaster management, envisioning machine learning as a vigilant guardian for coastal safety, and calls for a paradigm shift where human intuition and AI together enhance our capacity to anticipate, respond to, and mitigate the devastating impact of tsunamis.",
    "links": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=IzkudxkAAAAJ&hl=en"
      }
    ]
  },
  "tabulm": {
    "title": "TabuLM: Morphology-Aware Tabular Pre-training for Low-Resource Languages",
    "status": "arXiv:2608.26923 · Preprint · with Yashwanth Devavarapu & Ntakirutimana Pierre",
    "text": "We present TabuLM, the first language model pre-trained on Kinyarwanda tabular data. Kinyarwanda is a morphologically rich Bantu language spoken by over 12 million people in Rwanda, yet lacks any dedicated tabular representation-learning resource. TabuLM extends KinyaBERT-large, a two-tier morphological transformer, with additive row, column, and cell-type embeddings and a learned table-structure attention bias that sharpens same-row and same-column attention. Pre-training uses two new objectives: Masked Cell Recovery (masking entire cells and reconstructing from row/column context) and Column Type Prediction (predicting column semantic types from observed cell values). We pre-train on 172 Rwandan government tables (~35,000 cells) from NISR, RAB, REB, and MoH open-data portals, and introduce TabQA-kin, the first native Kinyarwanda table question-answering benchmark (526 QA pairs across 31 tables, four question types). TabuLM achieves 62.0% exact match on TabQA-kin, outperforming KinyaBERT-large by 5.7 EM points and all multilingual baselines (mBERT 49.3%, XLM-R 50.0%) by 11.7–12.7 points. Structural table embeddings prove most decisive for comparison and lookup questions, while morphological awareness provides complementary gains.",
    "links": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=IzkudxkAAAAJ&hl=en"
      }
    ]
  },
  "kinyaembed": {
    "title": "KinyaEmbed: Contrastive Sentence Embeddings for Kinyarwanda via Multi-Stage Curriculum Training",
    "status": "arXiv:2608.26941 · Preprint · with Yashwanth Devavarapu & Ntakirutimana Pierre",
    "text": "We present KinyaEmbed, the first dedicated sentence-embedding model for Kinyarwanda, a morphologically rich Bantu language spoken by over 12 million people in Rwanda. Existing multilingual embedding models (LaBSE, mE5-large, OpenAI text-embedding-3-large) perform poorly on Kinyarwanda due to severe under-representation in their pre-training corpora. Built on KinyaBERT-large and trained via a four-stage curriculum using MultipleNegativesRankingLoss: Stage 1 leverages ~18,000 paraphrase pairs from the Official Gazette of Rwanda; Stage 2 fine-tunes on NLLB-translated MNLI triplets for entailment structure; Stage 3 aligns representations via English–Kinyarwanda OPUS-100 translation pairs; Stage 4 refines with high-quality pairs filtered from KinyaCOMET. We evaluate on SemRel2024-rw and introduce Wiki-RW-STS, a new contamination-free Kinyarwanda STS benchmark. A seven-checkpoint ensemble achieves Spearman ρ=0.7298 on SemRel2024-rw, surpassing mE5-large by 20.9% and OpenAI text-embedding-3-large by 41.0%, and achieves the best document-clustering silhouette score across all evaluated models.",
    "links": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=IzkudxkAAAAJ&hl=en"
      }
    ]
  },
  "mhd": {
    "title": "Physics-Informed Neural Network Analysis of Rotational Effects on Oscillatory MHD Flow",
    "status": "Journal · Published",
    "text": "A physics-informed neural network approach to modeling rotational effects on oscillatory magnetohydrodynamic (MHD) flow.",
    "links": []
  },
  "mri": {
    "title": "Unpaired MRI Synthesis from Segmentation Maps",
    "status": "Harvard University collaboration · Project Lead since Apr 2026 · In Progress · Targeting an international journal",
    "text": "An unpaired diffusion model for the conditional generation of brain MRI scans from segmentation maps, developed in collaboration with Harvard University.\n\nThe project sits within a broader line of work on unsupervised deep learning for neuroimaging, focused on image registration and segmentation. It builds PyTorch-based diffusion and geometric-matching frameworks and applies them to MRI, OCT, and LSFM neuroimage data.\n\nAs appointed project lead, I coordinate experiments, technical contributions, and project milestones toward a journal-targeted publication.",
    "links": []
  },
  "astral": {
    "title": "Astral: Training-Free Multi-Domain Video Anomaly Detection via Agentic SOP Compilation and Symbolic World Models",
    "status": "In Progress",
    "text": "Most video anomaly detection (VAD) systems learn statistical notions of normality from large labeled datasets, making them brittle when transferred across domains. Astral (Agentic Symbolic Temporal Reasoning and Anomaly Localization) is a training-free, three-agent system that detects anomalies by reasoning about procedural rather than statistical normality. Given only a plain-language Standard Operating Procedure (SOP) and a video clip, Astral compiles a Canonical Normal World Model — a symbolic representation encoding expected entities, states, temporal protocol steps, and Linear Temporal Logic safety rules — then detects deviations from it without any dataset-specific training. Agent 1 (SOP Compiler) parses the SOP using a 3B-parameter vision-language model; Agent 2 (Deterministic Perceptual Engine) builds a per-frame scene graph via zero-shot detection and tracking, evaluating divergences against the world model through a graph-neural-network analyzer; Agent 3 (Triggered Reasoner) performs causal verification only on flagged clips. Evaluated across liquid-dispensing, industrial-factory, and robotic-manipulation domains, Astral achieves 100.0% accuracy on LiquidAD, 90.9% (F1=0.945) on IPAD, and 60.0% (F1=0.600) on a PhysAD sample, with zero false positives on normal videos across all three datasets.",
    "links": []
  },
  "scene": {
    "title": "Scene Representations for Robotics: From Metric Maps to 4D Semantic Gaussian Splatting",
    "status": "Survey · In Progress",
    "text": "Robots that execute autonomous tasks need highly expressive, constantly refined representations of the scenes they operate in to perceive, interact with, and reason about them. This survey provides an extensive, organized analysis of scene representations in robotics, tracing the evolutionary path from classical metric maps (occupancy grids, point clouds, truncated signed distance fields) through neural implicit representations (NeRF) to 3D Gaussian Splatting as a unifying explicit-neural hybrid representation. It offers a comprehensive taxonomy grouping 130+ methods into core robotic modules — dense SLAM, navigation, manipulation, semantic reasoning, and physics-informed modeling — with particular attention to the new frontier of 4D semantic Gaussian Splatting, combining temporal dynamics, semantic labels, and explicit Gaussian primitives to address dynamic scene reconstruction, long-term map maintenance, and open-vocabulary comprehension. The survey outlines open problems (catastrophic forgetting, scalability, real-time capability, semantic richness) and future directions toward robust, scalable, semantically rich 4D scene representations for next-generation autonomous systems.",
    "links": []
  },
  "adaptive-ids": {
    "title": "Adaptive Semi-Supervised Intrusion Detection in Software-Defined Networks: A Hybrid Autoencoder–Gradient Boosting Framework with Transformer-Based Comparative Analysis",
    "status": "Under Review",
    "text": "Software-defined networking (SDN) concentrates critical decision logic inside a centralised controller, creating a high-value attack surface susceptible to both volumetric flooding and control-plane exhaustion attacks. Existing ML-based intrusion detection systems in this domain are predominantly fully supervised, binary-class, and optimised for aggregate accuracy rather than minority-class reliability under realistic class imbalance. This paper proposes an adaptive semi-supervised IDS framework addressing limited labelled data, severe class imbalance, and controller-facing deployment constraints simultaneously, via a novel Hybrid Autoencoder + Gradient Boosting model: an autoencoder trained exclusively on dominant benign-traffic patterns derives reconstruction-error anomaly cues, fused with tabular flow features and fed to a Gradient Boosting classifier. Benchmarked against ten alternatives — classical baselines, standalone deep models, and transformer-based hybrids — under a unified, leakage-safe protocol, the proposed model achieves accuracy of 0.991, Macro-F1 of 0.964, rare-class recall of 0.941, and rare-class precision of 0.896 on a 9,123-record SDN flow dataset, outperforming all comparators in aggregate reliability and minority-class precision.",
    "links": []
  }
};

const openPub = function (key) {
  const p = pubData[key];
  if (!p) return;
  pmStatus.textContent = p.status;
  pmTitle.textContent = p.title;
  pmTech.textContent = "";
  pmTech.hidden = true;
  pmText.textContent = p.text;

  pmLinks.textContent = "";
  p.links.forEach(function (l) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "pm-link";
    a.textContent = l.label;
    li.appendChild(a);
    pmLinks.appendChild(li);
  });
  pmLinks.hidden = p.links.length === 0;

  pmOverlay.classList.add("open");
};

document.querySelectorAll("[data-pub]").forEach(function (el) {
  el.addEventListener("click", function () { openPub(el.dataset.pub); });
  el.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPub(el.dataset.pub); }
  });
});
