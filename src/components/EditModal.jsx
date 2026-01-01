export default function EditModal({
  open,
  name,
  setName,
  countryId,
  setCountryId,
  countries,
  onClose,
  onSave,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-5 text-gray-800">
          Edit Customer
        </h2>

        <label className="block text-sm font-medium text-gray-600 mb-1">
          Name
        </label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-600 mb-1">
          Country
        </label>
        <select
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:ring-2 focus:ring-purple-500 outline-none"
          value={countryId}
          onChange={e => setCountryId(e.target.value)}
        >
          {countries.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
