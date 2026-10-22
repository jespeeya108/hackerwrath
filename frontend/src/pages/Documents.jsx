
import { useState } from "react";
import { FileText, Download, Search } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";

const documents = [
  { id: 1, name: "Academic Calendar", category: "Academic", date: "2026-07-15", url: "/documents/academic-calendar.pdf" },
  { id: 2, name: "Examination Guidelines", category: "Examination", date: "2026-08-01", url: "/documents/examination-guidelines.pdf" },
  { id: 3, name: "Fee Structure", category: "Finance", date: "2026-07-20", url: "/documents/fee-structure.pdf" },
];

const Documents = () => {
  const [search, setSearch] = useState("");

  const filteredDocuments = documents.filter((document) =>
    `${document.name} ${document.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Documents"
        description="Access academic documents and important resources."
        breadcrumbs={[{ label: "Documents" }]}
      />

      <section className="dashboard-panel">
        <div className="panel-header">
          <div>
            <h2>Available Documents</h2>
            <p>Find and download portal resources</p>
          </div>
        </div>

        <div className="document-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search documents..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search documents"
          />
        </div>

        {filteredDocuments.length ? (
          <div className="document-list">
            {filteredDocuments.map((document) => (
              <article className="document-item" key={document.id}>
                <div className="document-icon"><FileText size={22} /></div>
                <div className="document-content">
                  <h3>{document.name}</h3>
                  <p>{document.category} · {document.date}</p>
                </div>
                <a
                  className="icon-button"
                  href={document.url}
                  download
                  aria-label={`Download ${document.name}`}
                >
                  <Download size={19} />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No documents found"
            description="Try another search term."
            icon={FileText}
          />
        )}
      </section>
    </div>
  );
};

export default Documents;
