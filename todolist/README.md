# To-Do List

React + TypeScript + Vite приложение со списком задач.

## Функции

- Добавление и удаление задач
- Отметка выполненных задач
- Поиск задач с подсветкой совпадений
- Заметки к каждой задаче (открываются в модальном блокноте)
- Карусель изображений с автопрокруткой
- Видео на заднем фоне

## Структура проекта

```
todolist/
├── public/
│   ├── background/   # Видео для фона (bg.mp4)
│   └── carousel/     # Фото для карусели (photo1-3.jpg)
├── src/
│   ├── components/
│   │   ├── Carousel.tsx
│   │   ├── NoteModal.tsx
│   │   ├── TodoItem.tsx
│   │   └── VideoBackground.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── style.css
└── index.html
```

## Запуск

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Собранные файлы появятся в папке `dist/`.

## Медиафайлы

Видео и картинки не хранятся в репозитории. Перед запуском положи:

- `public/background/bg.mp4` — видео для фона
- `public/carousel/photo1.jpg`, `photo2.jpg`, `photo3.jpg` — фото для карусели

## Деплой

Папку `dist/` можно задеплоить на любой статический хостинг:

- **Vercel** — `vercel --cwd todolist`
- **Netlify** — перетащи папку `dist/` на [netlify.com/drop](https://netlify.com/drop)
- **GitHub Pages** — используй [vite-plugin-gh-pages](https://github.com/skrtheboss/vite-plugin-gh-pages)
