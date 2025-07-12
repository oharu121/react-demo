import * as React from "react";

export default function FieldNotes() {
  const [notes, setNotes] = React.useState([
    "ReactコンポーネントはUIの見た目とロジックをまとめて管理します。",
    "関数を組み合わせるように、コンポーネントも組み合わせてUIを作成できます。",
    "JSXはJavaScriptの力とHTMLの読みやすさを融合しています。",
    "フックを使うことで、ロジックの再利用が簡単になります。",
  ]);

  const newNoteRef = React.useRef<HTMLLIElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newNote = formData.get("note");

    if (typeof newNote === "string" && newNote.trim()) {
      setNotes([...notes, newNote]);
      form.reset();
    }
  };

  React.useEffect(() => {
    if (newNoteRef.current) {
      newNoteRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <div className="h-[80vh] max-h-screen flex items-center justify-center py-10">
      <article className="p-8 bg-white border border-blue-200 rounded-2xl shadow-lg max-w-xl w-full h-full max-h-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 tracking-tight">Field Notes</h1>
        <div className="border border-blue-100 rounded-xl px-4 py-6 max-w-[600px] bg-blue-50 overflow-x-hidden w-full h-full max-h-full">
          <ul className="m-0 p-0 flex flex-col mb-6 space-y-0.5 w-full max-h-full overflow-y-auto overflow-x-hidden">
            {notes.map((msg, index) => {
              const isRight = index % 2 === 1;
              return (
                <li
                  ref={index === notes.length - 1 ? newNoteRef : null}
                  key={index}
                  className={[
                    "relative block px-3 py-2 mt-4 text-sm w-full sm:max-w-[70%] md:max-w-[400px] transition-all duration-300 break-words",
                    isRight
                      ? "self-end bg-purple-100 text-purple-900 rounded-t-lg rounded-bl-lg ml-16"
                      : "self-start bg-blue-100 text-blue-900 rounded-t-lg rounded-br-lg mr-16",
                    index === notes.length - 1 ? "mb-5" : ""
                  ].join(" ")}
                >
                  {msg}
                </li>
              );
            })}
          </ul>
          <div className="border-t border-dashed border-blue-200 mb-4" />
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 relative pb-4">
            <input
              required
              type="text"
              name="note"
              placeholder="メモを入力してください..."
              className="flex-1 rounded-md border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white shadow-sm"
            />
            <button
              className="sm:static absolute right-2 top-2 sm:right-0 sm:top-0 rounded-md px-4 py-2 font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-md w-full sm:w-auto text-base"
              type="submit"
            >
              送信
            </button>
          </form>
        </div>
      </article>
    </div>
  );
}
