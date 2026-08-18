<script setup lang="ts">
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const form = reactive({
  discoveryChannels: [] as string[],
  website: '',
  business: '',
  problem: '',
})

const discoveryOptions = [
  'Через рекомендации',
  'Через соцсети / рекламу',
  'Свой сайт',
]

const hasWebsite = computed(() => form.discoveryChannels.includes('Свой сайт'))
const status = ref<FormStatus>('idle')
const preparedMessage = ref('')
const copied = ref(false)
const discoveryError = ref(false)

watch(hasWebsite, (enabled) => {
  if (!enabled) {
    form.website = ''
  }
})

function buildMessage() {
  return [
    'Здравствуйте, Эльдар. Хочу получить мини-аудит сайта.',
    '',
    `Как узнают клиенты: ${form.discoveryChannels.join(', ')}`,
    `Сайт: ${hasWebsite.value ? form.website : 'сайта нет'}`,
    `Бизнес и регион: ${form.business}`,
    `Главная проблема: ${form.problem}`,
  ].join('\n')
}

async function submitAudit() {
  if (form.discoveryChannels.length === 0) {
    discoveryError.value = true
    return
  }

  status.value = 'loading'
  copied.value = false

  try {
    preparedMessage.value = buildMessage()
    await new Promise((resolve) => window.setTimeout(resolve, 250))
    const link = `https://t.me/xemay4ik?text=${encodeURIComponent(preparedMessage.value)}`
    window.open(link, '_blank', 'noopener,noreferrer')
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}

async function copyMessage() {
  try {
    await navigator.clipboard.writeText(preparedMessage.value)
    copied.value = true
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="audit" class="audit section-block" aria-labelledby="audit-title">
    <div class="page-shell audit__grid">
      <div v-reveal class="audit__content">
        <h2 id="audit-title">3 точки роста вашего бизнеса</h2>
        <p>
          Посмотрю, как клиенты находят вас и что может мешать им обратиться. Отмечу, что можно улучшить.
        </p>
        <div class="audit__result">
          <h3>Что получите</h3>
          <ul class="dash-list">
            <li>Три главные проблемы по приоритету</li>
            <li>По одному примеру исправления</li>
            <li>Вывод: правки, редизайн или новый сайт</li>
          </ul>
        </div>
        <div class="audit__format">
          <h3>Формат результата</h3>
          <p>Присылаю короткое сообщение/видео или PDF файл с разбором.</p>
        </div>
      </div>

      <form v-reveal="'delay'" class="audit-form" @submit.prevent="submitAudit">
        <h3>Получить мини-аудит</h3>
        <p>Ответьте на несколько вопросов. Сайт подготовит сообщение и откроет Telegram.</p>

        <fieldset class="audit-form__source-group" :aria-describedby="discoveryError ? 'discovery-error' : undefined">
          <legend>Как о вас узнают клиенты?</legend>
          <div class="audit-form__choices">
            <label v-for="option in discoveryOptions" :key="option" class="audit-form__check">
              <input
                v-model="form.discoveryChannels"
                type="checkbox"
                :value="option"
                @change="discoveryError = false"
              />
              <span>{{ option }}</span>
            </label>
          </div>
          <p v-if="discoveryError" id="discovery-error" class="audit-form__field-error">
            Выберите хотя бы один вариант.
          </p>
        </fieldset>

        <label>
          <span>Адрес сайта</span>
          <input
            v-model.trim="form.website"
            type="url"
            :placeholder="hasWebsite ? 'https://example.ru' : 'Сначала выберите «Свой сайт»'"
            :disabled="!hasWebsite"
            :required="hasWebsite"
          />
        </label>

        <label>
          <span>Бизнес и регион</span>
          <input
            v-model.trim="form.business"
            type="text"
            placeholder="Чем занимаетесь и где работаете"
            required
          />
        </label>

        <label>
          <span>Главная проблема</span>
          <textarea
            v-model.trim="form.problem"
            rows="4"
            placeholder="Что сейчас не устраивает"
            required
          />
        </label>

        <p class="audit-form__privacy">
          Данные не сохраняются на сайте. После нажатия на кнопку откроется вкладка, чтобы отправить сообщение.
        </p>

        <button class="button button--primary button--without-icon" type="submit" :disabled="status === 'loading'">
          {{ status === 'loading' ? 'Готовлю сообщение…' : 'Получить разбор' }}
        </button>

        <div class="audit-form__status" aria-live="polite">
          <template v-if="status === 'success'">
            <p>Сообщение готово. Если Telegram не открылся, скопируйте текст вручную.</p>
            <textarea readonly :value="preparedMessage" aria-label="Подготовленное сообщение" />
            <button class="copy-button" type="button" @click="copyMessage">
              <Icon :name="copied ? 'ph:check' : 'ph:copy'" aria-hidden="true" />
              {{ copied ? 'Скопировано' : 'Скопировать текст' }}
            </button>
          </template>
          <p v-else-if="status === 'error'" class="form-error">
            Не удалось открыть Telegram. Проверьте браузер или напишите напрямую: @xemay4ik.
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.audit {
  background: #1b1b1d;
  color: #f5f5f7;
}

.audit__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(520px, 1.05fr);
  align-items: start;
  gap: 80px;
}

.audit__content h2 {
  max-width: 560px;
}

.audit__content > p {
  max-width: 560px;
  margin-top: 34px;
  color: #b7b7bd;
  font-size: 18px;
}

.audit__result,
.audit__format {
  margin-top: 64px;
}

.audit__result h3,
.audit__format h3 {
  font-size: 22px;
}

.dash-list {
  display: grid;
  gap: 16px;
  margin: 34px 0 0;
  padding: 0;
  color: #d1d1d6;
  list-style: none;
}

.dash-list li {
  position: relative;
  padding-left: 28px;
}

.dash-list li::before {
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 14px;
  height: 2px;
  background: var(--accent);
  content: "";
}

.audit__format p {
  max-width: 540px;
  margin-top: 20px;
  color: #b7b7bd;
}

.audit-form {
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: var(--radius-card);
  padding: 36px;
  background: #262628;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06);
}

.audit-form > h3 {
  font-size: 30px;
}

.audit-form > h3 + p {
  margin: 10px 0 30px;
  color: #b7b7bd;
  font-size: 16px;
}

.audit-form > label {
  display: grid;
  gap: 8px;
  margin-top: 20px;
}

.audit-form > label > span,
.audit-form__source-group legend {
  font-size: 14px;
  font-weight: 600;
}

.audit-form input:not([type="checkbox"]),
.audit-form textarea,
.audit-form__status textarea {
  width: 100%;
  border: 1px solid #5e5e64;
  border-radius: var(--radius-control);
  padding: 13px 15px;
  background: #1b1b1d;
  color: #f5f5f7;
  line-height: 1.4;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.audit-form input:not([type="checkbox"]) {
  min-height: 48px;
}

.audit-form textarea {
  resize: vertical;
}

.audit-form input:not([type="checkbox"])::placeholder,
.audit-form textarea::placeholder {
  color: #9b9ba1;
  opacity: 1;
}

.audit-form input:not([type="checkbox"]):focus,
.audit-form textarea:focus {
  border-color: var(--accent-focus);
  outline: none;
  box-shadow: 0 0 0 3px rgb(0 113 227 / 0.16);
}

.audit-form input:not([type="checkbox"]):disabled {
  border-color: #46464b;
  background: #222224;
  color: #77777d;
  cursor: not-allowed;
  opacity: 0.72;
}

.audit-form__source-group {
  margin: 0;
  border: 0;
  padding: 0;
}

.audit-form__choices {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.audit-form__check {
  display: flex;
  min-height: 56px;
  align-items: center;
  gap: 10px;
  margin: 0;
  border: 1px solid #5e5e64;
  border-radius: var(--radius-control);
  padding: 11px 12px;
  background: #1b1b1d;
  color: #d1d1d6;
  cursor: pointer;
  transition: border-color 180ms ease, background 180ms ease;
}

.audit-form__check:hover {
  border-color: #85858b;
}

.audit-form__check:has(input:checked) {
  border-color: var(--accent-dark);
  background: rgb(41 151 255 / 0.1);
  color: #f5f5f7;
}

.audit-form__check input {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  margin: 0;
  accent-color: var(--accent-focus);
}

.audit-form__check span {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
}

.audit-form__field-error {
  margin-top: 9px;
  color: #ff8f86;
  font-size: 13px;
}

.audit-form__privacy {
  margin: 24px 0;
  color: #a9a9af;
  font-size: 13px;
}

.audit-form__status {
  margin-top: 20px;
  color: #c7c7cc;
  font-size: 14px;
}

.audit-form__status textarea {
  min-height: 160px;
  margin-top: 12px;
  font-size: 13px;
}

.copy-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--accent-dark);
  cursor: pointer;
}

.form-error {
  color: #ff8f86;
}

@media (max-width: 1068px) {
  .audit__grid {
    grid-template-columns: minmax(0, 0.9fr) minmax(480px, 1.1fr);
    gap: 50px;
  }
}

@media (max-width: 833px) {
  .audit__grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}

@media (max-width: 640px) {
  .audit__result,
  .audit__format {
    margin-top: 46px;
  }

  .audit-form {
    padding: 24px;
  }

  .audit-form > h3 {
    font-size: 28px;
  }

  .audit-form__choices {
    grid-template-columns: 1fr;
  }

  .audit-form :deep(.button) {
    width: 100%;
  }
}
</style>
