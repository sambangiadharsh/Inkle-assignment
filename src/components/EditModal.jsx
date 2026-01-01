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

  const isNameValid = name.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-5 text-gray-800">
          Edit Customer
        </h2>

      
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          className={`w-full border rounded-lg px-3 py-2 mb-1 outline-none
            focus:ring-2
            ${isNameValid
              ? "focus:ring-purple-500"
              : "border-red-500 focus:ring-red-500"}
          `}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {!isNameValid && (
          <p className="text-sm text-red-500 mb-3">
            Name is required
          </p>
        )}

        
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
            disabled={!isNameValid}
            className={`px-4 py-2 rounded-lg text-white transition
              ${isNameValid
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
