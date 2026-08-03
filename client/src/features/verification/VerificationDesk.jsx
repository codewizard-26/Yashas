import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { MOCK_VERIFICATION_QUEUE } from '../../shared/mockData/yashasData';

export default function VerificationDesk() {
  const [queue, setQueue] = useState(MOCK_VERIFICATION_QUEUE);
  const [selectedRequest, setSelectedRequest] = useState(queue[0] || null);
  const [processedCount, setProcessedCount] = useState(14);
  const [rejectFeedback, setRejectFeedback] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleApprove = (reqId) => {
    setQueue(queue.filter(r => r.requestId !== reqId));
    setProcessedCount(prev => prev + 1);
    if (selectedRequest?.requestId === reqId) {
      const remaining = queue.filter(r => r.requestId !== reqId);
      setSelectedRequest(remaining[0] || null);
    }
  };

  const handleReject = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;
    setQueue(queue.filter(r => r.requestId !== selectedRequest.requestId));
    setShowRejectModal(false);
    setRejectFeedback('');
    const remaining = queue.filter(r => r.requestId !== selectedRequest.requestId);
    setSelectedRequest(remaining[0] || null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden border border-white/80">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#00687a] font-bold text-xs tracking-wider uppercase mb-2">
              <Building2 className="w-5 h-5" /> College Admin & Registrar Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              Institutional Verification <span className="text-gradient">Desk</span>
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl text-sm leading-relaxed">
              Inspect uploaded student certificates, cross-check AI OCR extractions against official roll registries, and issue cryptographically signed digital seals.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/90 p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold block">Approved Today</span>
              <span className="text-2xl font-extrabold text-[#00687a]">{processedCount} Credentials</span>
            </div>
            <ShieldCheck className="w-10 h-10 text-[#00687a]" />
          </div>
        </div>
      </div>

      {/* Main Queue Layout */}
      {queue.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Queue List */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
              <span>Pending Audit Requests ({queue.length})</span>
              <span className="text-xs text-amber-700 font-bold">Priority Queue</span>
            </h3>

            <div className="space-y-3">
              {queue.map((req) => {
                const isSelected = selectedRequest?.requestId === req.requestId;

                return (
                  <div
                    key={req.requestId}
                    onClick={() => setSelectedRequest(req)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#00687a]/10 border-[#00687a]/40 shadow-md' 
                        : 'bg-white/80 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={req.studentAvatar} alt={req.studentName} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#0b1c30] truncate">{req.studentName}</h4>
                          <span className="text-[10px] font-bold text-[#00687a] bg-[#00687a]/10 px-2 py-0.5 rounded border border-[#00687a]/20">
                            {req.ocrConfidence}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate font-medium">{req.certTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-[11px] text-gray-400 font-medium border-t border-gray-100 pt-2">
                      <span>Roll: <strong className="text-gray-700 font-mono">{req.studentRoll}</strong></span>
                      <span>{req.submittedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Columns: Audit Workspace */}
          {selectedRequest && (
            <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-2xl border border-white/80 space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <img src={selectedRequest.studentAvatar} alt={selectedRequest.studentName} className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0b1c30]">{selectedRequest.studentName}</h2>
                    <p className="text-xs font-semibold text-gray-500">Roll No: <span className="font-mono text-[#0b1c30]">{selectedRequest.studentRoll}</span> • Submitted on {selectedRequest.submittedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-colors"
                  >
                    <XCircle className="w-4 h-4" /> Reject Request
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest.requestId)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#00687a] hover:bg-[#00687a]/90 text-white text-xs font-bold shadow-md transition-all active:scale-[0.98]"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Grant Institutional Seal
                  </button>
                </div>
              </div>

              {/* Claimed Metadata & AI OCR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
                  <span className="text-gray-500 font-bold uppercase tracking-wider block">Student Claimed Title</span>
                  <p className="text-[#0b1c30] font-bold text-sm">{selectedRequest.certTitle}</p>
                  <div className="pt-2 text-gray-600 font-medium">
                    Category: <strong className="text-[#3525cd]">{selectedRequest.category}</strong>
                  </div>
                  <div className="text-gray-600 font-medium">
                    Claimed Issuer: <strong className="text-gray-800">{selectedRequest.issuerClaimed}</strong>
                  </div>
                </div>

                <div className="bg-[#00687a]/10 p-4 rounded-xl border border-[#00687a]/20 space-y-2 text-xs">
                  <span className="text-[#00687a] font-extrabold uppercase tracking-wider block flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> AI OCR Verification Score
                  </span>
                  <div className="text-2xl font-extrabold text-[#00687a]">{selectedRequest.ocrConfidence}</div>
                  <p className="text-gray-600 font-medium">Document text matches campus database registry records.</p>
                </div>
              </div>

              {/* Document Image Viewer */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#3525cd]" /> Uploaded Document Inspection
                </h4>
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 max-h-96">
                  <img 
                    src={selectedRequest.documentUrl} 
                    alt="Certificate Document" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty Queue State */
        <div className="glass-panel p-12 rounded-2xl text-center border border-white/80 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#00687a]/10 text-[#00687a] flex items-center justify-center mx-auto border border-[#00687a]/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0b1c30]">Verification Queue Clear!</h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto font-medium">
            All student certificate verification requests have been audited and stamped with institutional credentials.
          </p>
        </div>
      )}

      {/* REJECT MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/50 backdrop-blur-md">
          <div className="bg-white max-w-md w-full rounded-2xl border border-gray-200 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-extrabold text-[#0b1c30]">Reject Verification Request</h3>
            <p className="text-xs text-gray-500 font-medium">Specify reason for student rejection (e.g. illegible scan, mismatched roll number).</p>
            
            <form onSubmit={handleReject} className="space-y-4">
              <textarea
                required
                rows={4}
                value={rejectFeedback}
                onChange={(e) => setRejectFeedback(e.target.value)}
                placeholder="Enter feedback for student..."
                className="w-full bg-[#f8f9ff] border border-gray-200 text-[#0b1c30] text-xs p-3 rounded-xl focus:border-red-500 outline-none font-semibold"
              ></textarea>

              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-[#0b1c30]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Confirm Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
