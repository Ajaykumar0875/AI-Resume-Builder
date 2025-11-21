import React from 'react'
import { PlusIcon, XIcon } from 'lucide-react'

const CertificationsForm = ({ data = [], onChange }) => {
  const addCert = () => {
    const newCert = { name: '', issuer: '', link: '' };
    onChange([...data, newCert]);
  };

  const removeCert = (idx) => {
    onChange(data.filter((_, i) => i !== idx));
  };

  const updateCert = (idx, field, value) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Certifications</h3>
          <p className="text-sm text-gray-500">Add your certifications, courses, or licenses.</p>
        </div>
        <button
          onClick={addCert}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <PlusIcon className="size-4" /> Add Certification
        </button>
      </div>
      <div className="space-y-4 mt-6">
        {data.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No certifications added yet.</p>
            <p className="text-sm">Add your certifications, courses, or licenses to highlight your achievements.</p>
          </div>
        )}
        {data.map((cert, idx) => (
          <div key={idx} className="border p-4 border-gray-200 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <h4>Certification - {idx + 1}</h4>
              <button className="text-red-500 hover:text-red-700 transition-colors" onClick={() => removeCert(idx)}>
                <XIcon className="size-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                value={cert.name || ''}
                onChange={e => updateCert(idx, 'name', e.target.value)}
                type="text"
                placeholder="Certificate Name"
                className="px-3 py-2 text-sm rounded-lg"
              />
              <input
                value={cert.issuer || ''}
                onChange={e => updateCert(idx, 'issuer', e.target.value)}
                type="text"
                placeholder="Issuer"
                className="px-3 py-2 text-sm rounded-lg"
              />
              <input
                value={cert.link || ''}
                onChange={e => updateCert(idx, 'link', e.target.value)}
                type="text"
                placeholder="Drive link (optional)"
                className="w-full px-3 py-2 text-sm rounded-lg col-span-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CertificationsForm