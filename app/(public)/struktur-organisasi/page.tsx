import { query } from "@/lib/db";
import type { OrganizationMember } from "@/types";

async function getMembers() {
  try {
    return await query<OrganizationMember>("SELECT * FROM organization_members ORDER BY sort_order");
  } catch {
    return [];
  }
}

export default async function StrukturOrganisasiPage() {
  const members = await getMembers();
  const list = Array.isArray(members) ? members : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary-700 mb-4">
        Struktur Organisasi
      </h1>
      <p className="text-gray-600 mb-12">
        Tim manajemen PT Kekar Jaya Security yang berpengalaman dan profesional.
      </p>

      {list.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {list.map((member) => (
            <div key={member.id} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                {member.photo ? (
                  <img
                    src={`/uploads/${member.photo}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-700 text-3xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="font-bold text-primary-700">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.position}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          Data struktur organisasi belum tersedia.
        </p>
      )}
    </div>
  );
}
