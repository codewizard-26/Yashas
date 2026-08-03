import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Upload, 
  Share2, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Pin, 
  QrCode, 
  X, 
  FileText, 
  Sparkles, 
  Copy,
  Check
} from 'lucide-react';
import { MOCK_CERTIFICATES } from '../../shared/mockData/yashasData';

export default function CertificateVault() {
  const [certificates, setCertificates] = useState(MOCK_CERTIFICATES);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  
  const [isUploading, setIsUploading] = useState(false);
  const [ocrData, setOcrData] = useState(null);

  const filterOptions = [
    { id: 'ALL', label: 'All Smart Credentials' },
    { id: 'VERIFIED', label: 'Official Verified' },
    { id: 'HACKATHON', label: 'Hackathons' },
    { id: 'ACADEMIC', label: 'Academic' },
    { id: 'CLOUD', label: 'Cloud' },
    { id: 'PENDING_APPROVAL', label: 'Pending Audit' }
  ];

  const filteredCerts = certificates.filter(cert => {
    const matchesTab = activeTab === 'ALL' 
      ? true 
      : activeTab === 'VERIFIED'
      ? cert.verificationStatus === 'VERIFIED'
      : activeTab === 'PENDING_APPROVAL'
      ? cert.verificationStatus === 'PENDING_APPROVAL'
      : cert.category === activeTab;

    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const verifiedCount = certificates.filter(c => c.verificationStatus === 'VERIFIED').length;
  const pendingCount = certificates.filter(c => c.verificationStatus === 'PENDING_APPROVAL').length;
  const unverifiedCount = certificates.filter(c => c.verificationStatus === 'UNVERIFIED').length;

  const handleSimulatedFileUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setOcrData({
        title: "National Machine Learning Hackathon 2026",
        category: "HACKATHON",
        issuerName: "IIT Madras Incubation Cell",
        issueDate: "2026-03-25",
        credentialId: "IITM-ML-2026-9042",
        skills: "Python, PyTorch, Scikit-Learn, FastAPI",
        description: "Awarded for building an automated smart grid energy predictor."
      });
    }, 1200);
  };

  const handleSaveCertificate = (e) => {
    e.preventDefault();
    if (!ocrData) return;
    const newCert = {
      id: `cert-${Date.now()}`,
      title: ocrData.title,
      category: ocrData.category,
      issuerName: ocrData.issuerName,
      issuerLogo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120",
      issueDate: ocrData.issueDate,
      credentialId: ocrData.credentialId,
      verificationStatus: "PENDING_APPROVAL",
      verificationDate: null,
      verifiedBy: null,
      fileUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=800",
      skills: ocrData.skills.split(',').map(s => s.trim()),
      pinned: false,
      description: ocrData.description
    };
    setCertificates([newCert, ...certificates]);
    setShowUploadModal(false);
    setOcrData(null);
  };

  const togglePin = (certId) => {
    setCertificates(certificates.map(c => 
      c.id === certId ? { ...c, pinned: !c.pinned } : c
    ));
  };

  const copyCredentialLink = (id) => {
    navigator.clipboard?.writeText(`https://yashas.edu/verify/${id}`);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner - Stitch Light Mode */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden border border-white/80">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#3525cd] font-bold text-xs tracking-wider uppercase mb-2">
              <ShieldCheck className="w-5 h-5 text-[#3525cd]" /> Verified Smart Credentials
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              Student Certificate <span className="text-gradient">Vault</span>
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl text-sm leading-relaxed">
              Cryptographically timestamped and institution-verified achievement vault. Upload credentials, trigger college audit requests, and share verifiable badges with recruiters.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center gap-2 bg-[#3525cd] hover:bg-[#3525cd]/90 text-white font-bold px-6 py-3.5 rounded-xl shadow-md shadow-[#3525cd]/20 transition-all active:scale-[0.98]"
          >
            <Upload className="w-5 h-5" />
            Upload New Certificate
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200/80">
          <div className="bg-white/80 p-4 rounded-xl border border-gray-200/60 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase">Total Credentials</span>
            <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">{certificates.length}</div>
          </div>
          <div className="bg-[#00687a]/10 p-4 rounded-xl border border-[#00687a]/20">
            <div className="flex items-center gap-1.5 text-[#00687a] text-xs font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" /> Verified Seals
            </div>
            <div className="text-2xl font-extrabold text-[#00687a] mt-1">{verifiedCount}</div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
            <div className="flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase">
              <Clock className="w-4 h-4" /> Pending Desk Audit
            </div>
            <div className="text-2xl font-extrabold text-amber-800 mt-1">{pendingCount}</div>
          </div>
          <div className="bg-white/80 p-4 rounded-xl border border-gray-200/60 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase">Self Reported</span>
            <div className="text-2xl font-extrabold text-gray-700 mt-1">{unverifiedCount}</div>
          </div>
        </div>
      </div>

      {/* Controls: Search & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search certificates, skills, or issuer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/90 border border-gray-200 text-[#0b1c30] rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#3525cd] transition-colors shadow-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {filterOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#3525cd] text-white shadow-md shadow-[#3525cd]/20'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-[#3525cd] border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Certificate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => {
          const isVerified = cert.verificationStatus === 'VERIFIED';
          const isPending = cert.verificationStatus === 'PENDING_APPROVAL';

          return (
            <div 
              key={cert.id}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between group relative border border-white/80"
            >
              {/* Top Image Preview */}
              <div className="h-44 relative bg-gray-100 overflow-hidden">
                <img 
                  src={cert.fileUrl} 
                  alt={cert.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/70 via-transparent to-transparent"></div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  {isVerified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#00687a] text-white backdrop-blur-md shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Badge
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white backdrop-blur-md shadow-sm">
                      <Clock className="w-3.5 h-3.5" /> Pending Audit
                    </span>
                  )}
                  {!isVerified && !isPending && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-600 text-white backdrop-blur-md">
                      <AlertCircle className="w-3.5 h-3.5" /> Self-Reported
                    </span>
                  )}
                </div>

                {/* Pin Button */}
                <button
                  onClick={() => togglePin(cert.id)}
                  title={cert.pinned ? "Unpin" : "Pin"}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    cert.pinned 
                      ? 'bg-[#3525cd] text-white shadow-md' 
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Pin className="w-3.5 h-3.5 fill-current" />
                </button>

                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-[#3525cd]">
                  {cert.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <img 
                      src={cert.issuerLogo} 
                      alt={cert.issuerName} 
                      className="w-6 h-6 rounded-full object-cover border border-gray-200"
                    />
                    <span className="text-xs font-bold text-gray-500 truncate">
                      {cert.issuerName}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#3525cd] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-[#3525cd]/5 text-[#3525cd] font-bold border border-[#3525cd]/15">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-semibold text-gray-400 flex justify-between items-center pt-3 border-t border-gray-100">
                    <span>ID: <code className="text-gray-700 font-mono">{cert.credentialId}</code></span>
                    <span>{cert.issueDate}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#3525cd]/10 hover:bg-[#3525cd]/15 text-[#3525cd] font-bold text-xs py-2 px-3 rounded-xl transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Seal & QR
                  </button>
                  
                  <button
                    onClick={() => setSelectedCert(cert)}
                    title="Share Link"
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CERTIFICATE DETAILS & QR MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/50 backdrop-blur-md">
          <div className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#3525cd]/10 text-[#3525cd]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0b1c30]">{selectedCert.title}</h3>
                  <span className="text-xs font-semibold text-gray-500">{selectedCert.issuerName}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCert(null)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img 
                  src={selectedCert.fileUrl} 
                  alt={selectedCert.title} 
                  className="w-full h-64 object-cover"
                />
                {selectedCert.verificationStatus === 'VERIFIED' && (
                  <div className="absolute bottom-4 right-4 bg-white/95 border border-[#00687a]/30 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-[#00687a] text-xs font-extrabold shadow-md">
                    <ShieldCheck className="w-5 h-5 text-[#00687a]" />
                    AUTHENTICATED INSTITUTIONAL SEAL
                  </div>
                )}
              </div>

              <div className="bg-[#f8f9ff] p-4 rounded-xl border border-gray-200 space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verification Trail & Metadata</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 block">Credential ID</span>
                    <span className="font-mono text-[#0b1c30] font-bold">{selectedCert.credentialId}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Status</span>
                    <span className={`font-bold ${
                      selectedCert.verificationStatus === 'VERIFIED' ? 'text-[#00687a]' : 'text-amber-700'
                    }`}>
                      {selectedCert.verificationStatus}
                    </span>
                  </div>
                  {selectedCert.verifiedBy && (
                    <div>
                      <span className="text-gray-500 block">Verified By</span>
                      <span className="text-[#0b1c30] font-bold">{selectedCert.verifiedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#3525cd]/5 p-4 rounded-xl border border-[#3525cd]/20">
                <div className="bg-white p-2 rounded-lg shrink-0 border border-gray-200">
                  <QrCode className="w-16 h-16 text-[#0b1c30]" />
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-[#0b1c30]">Public Recruiter Verification Link</h4>
                  <p className="text-xs text-gray-500">Recruiters can inspect live cryptographic validity without logging into Yashas.</p>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={`https://yashas.edu/verify/${selectedCert.credentialId}`}
                      className="bg-white border border-gray-200 text-[#0b1c30] text-xs px-3 py-2 rounded-lg flex-1 font-mono focus:outline-none"
                    />
                    <button
                      onClick={() => copyCredentialLink(selectedCert.credentialId)}
                      className="bg-[#3525cd] hover:bg-[#3525cd]/90 text-white p-2 rounded-lg text-xs font-bold transition-colors"
                    >
                      {copiedId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-[#0b1c30]"
              >
                Close
              </button>
              <a 
                href={selectedCert.fileUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 bg-[#3525cd] hover:bg-[#3525cd]/90 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Original PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/50 backdrop-blur-md">
          <div className="bg-white max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#3525cd]" />
                <h3 className="text-lg font-extrabold text-[#0b1c30]">Smart Certificate Upload (AI OCR)</h3>
              </div>
              <button onClick={() => { setShowUploadModal(false); setOcrData(null); }} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {!ocrData ? (
                <form onSubmit={handleSimulatedFileUpload} className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 hover:border-[#3525cd] rounded-2xl p-8 text-center bg-[#f8f9ff] transition-colors cursor-pointer group">
                    <Upload className="w-12 h-12 text-[#3525cd] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-bold text-[#0b1c30]">Drag & drop certificate PDF or image here</p>
                    <p className="text-xs text-gray-500 mt-1">Supports PDF, PNG, JPG up to 10MB</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-[#3525cd] hover:bg-[#3525cd]/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#3525cd]/20"
                  >
                    {isUploading ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" /> AI Extracting Credentials...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" /> Run OCR & Auto-Extract Metadata
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSaveCertificate} className="space-y-4">
                  <div className="p-3 bg-[#00687a]/10 border border-[#00687a]/20 rounded-xl text-[#00687a] text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    AI OCR Extracted metadata! Review and submit for college audit.
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">Certificate Title</label>
                    <input 
                      type="text" 
                      value={ocrData.title}
                      onChange={(e) => setOcrData({ ...ocrData, title: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-[#0b1c30] text-xs p-2.5 rounded-lg focus:border-[#3525cd] outline-none font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-600 block mb-1">Issuing Body</label>
                      <input 
                        type="text" 
                        value={ocrData.issuerName}
                        onChange={(e) => setOcrData({ ...ocrData, issuerName: e.target.value })}
                        className="w-full bg-white border border-gray-200 text-[#0b1c30] text-xs p-2.5 rounded-lg focus:border-[#3525cd] outline-none font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600 block mb-1">Category</label>
                      <select 
                        value={ocrData.category}
                        onChange={(e) => setOcrData({ ...ocrData, category: e.target.value })}
                        className="w-full bg-white border border-gray-200 text-[#0b1c30] text-xs p-2.5 rounded-lg focus:border-[#3525cd] outline-none font-semibold"
                      >
                        <option value="HACKATHON">HACKATHON</option>
                        <option value="ACADEMIC">ACADEMIC</option>
                        <option value="CLOUD">CLOUD</option>
                        <option value="WORKSHOP">WORKSHOP</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                    <button 
                      type="button" 
                      onClick={() => setOcrData(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-[#0b1c30]"
                    >
                      Re-upload
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-[#3525cd] hover:bg-[#3525cd]/90 text-white rounded-xl text-xs font-bold shadow-md"
                    >
                      Submit for Institutional Audit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
