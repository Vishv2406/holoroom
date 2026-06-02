import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useHomeStore } from '../../store/useHomeStore';

const CONDITION_OPTIONS = ['turns_on', 'turns_off'];
const ACTION_OPTIONS = ['turn_on', 'turn_off', 'set_speed'];
const CONDITION_LABELS: Record<string, string> = {
  turns_on: 'turns ON',
  turns_off: 'turns OFF',
};
const ACTION_LABELS: Record<string, string> = {
  turn_on: 'Turn ON',
  turn_off: 'Turn OFF',
  set_speed: 'Set Speed',
};

export function AutomationBuilder() {
  const {
    isAutomationOpen,
    toggleAutomation,
    rooms,
    automationRules,
    addAutomationRule,
    deleteAutomationRule,
    toggleAutomationRule,
    addNotification,
  } = useHomeStore();

  const allDevices = rooms.flatMap((room) =>
    room.devices.map((d) => ({ ...d, roomName: room.name }))
  );

  const [triggerDeviceId, setTriggerDeviceId] = useState<number | ''>('');
  const [triggerCondition, setTriggerCondition] = useState('turns_on');
  const [actionDeviceId, setActionDeviceId] = useState<number | ''>('');
  const [action, setAction] = useState('turn_on');
  const [actionValue, setActionValue] = useState<number>(1);
  const [ruleName, setRuleName] = useState('');

  const handleAdd = () => {
    if (!triggerDeviceId || !actionDeviceId || !ruleName.trim()) return;

    const tDev = allDevices.find((d) => d.id === +triggerDeviceId);
    const aDev = allDevices.find((d) => d.id === +actionDeviceId);
    const name = ruleName.trim() || `IF ${tDev?.name} ${CONDITION_LABELS[triggerCondition]} → ${ACTION_LABELS[action]} ${aDev?.name}`;

    addAutomationRule({
      name,
      triggerDeviceId: +triggerDeviceId,
      triggerCondition,
      actionDeviceId: +actionDeviceId,
      action,
      actionValue: action === 'set_speed' ? actionValue : undefined,
      isEnabled: true,
    });

    addNotification(`Automation rule "${name}" created!`, 'success');
    setRuleName('');
    setTriggerDeviceId('');
    setActionDeviceId('');
  };

  const getDeviceName = (id: number | null) => {
    if (!id) return 'Unknown';
    return allDevices.find((d) => d.id === id)?.name ?? 'Unknown';
  };

  const getDeviceRoom = (id: number | null) => {
    if (!id) return '';
    return allDevices.find((d) => d.id === id)?.roomName ?? '';
  };

  const selectStyle = {
    background: '#1A1A35',
    border: '1px solid #2A2A4A',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '8px 10px',
    fontSize: '13px',
    width: '100%',
    outline: 'none',
  };

  return (
    <AnimatePresence>
      {isAutomationOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-[60px] bottom-0 flex flex-col overflow-hidden"
          style={{
            left: '280px',
            width: '340px',
            background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A1A 100%)',
            borderRight: '1px solid #1E1E3A',
            borderLeft: '1px solid #1E1E3A',
            zIndex: 45,
            pointerEvents: 'auto',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid #1E1E3A' }}>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <div>
                <div className="text-white font-bold">Automation Rules</div>
                <div className="text-xs" style={{ color: '#888899' }}>If-Then logic builder</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleAutomation();
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
              style={{ background: '#1A1A35', border: '1px solid #2A2A4A', cursor: 'pointer' }}
            >
              <X size={14} style={{ color: '#AAAACC' }} />
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Rule Builder */}
            <div className="p-4 rounded-xl space-y-3"
              style={{ background: '#131328', border: '1px solid #2A2A4A' }}>
              <div className="text-sm font-bold text-white">Create New Rule</div>

              {/* Rule name */}
              <input
                type="text"
                placeholder="Rule name..."
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                style={selectStyle}
              />

              {/* IF section */}
              <div className="p-3 rounded-lg" style={{ background: '#0E0E22', border: '1px solid #1E1E3A' }}>
                <div className="text-xs font-bold mb-2" style={{ color: '#9B59B6' }}>🔵 IF (Trigger)</div>
                <div className="space-y-2">
                  <select
                    value={triggerDeviceId}
                    onChange={(e) => setTriggerDeviceId(e.target.value ? +e.target.value : '')}
                    style={selectStyle}
                  >
                    <option value="">Select device...</option>
                    {allDevices.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.roomName})
                      </option>
                    ))}
                  </select>
                  <select
                    value={triggerCondition}
                    onChange={(e) => setTriggerCondition(e.target.value)}
                    style={selectStyle}
                  >
                    {CONDITION_OPTIONS.map((c) => (
                      <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-center text-lg">↓</div>

              {/* THEN section */}
              <div className="p-3 rounded-lg" style={{ background: '#0E0E22', border: '1px solid #1E1E3A' }}>
                <div className="text-xs font-bold mb-2" style={{ color: '#00BCD4' }}>🟦 THEN (Action)</div>
                <div className="space-y-2">
                  <select
                    value={actionDeviceId}
                    onChange={(e) => setActionDeviceId(e.target.value ? +e.target.value : '')}
                    style={selectStyle}
                  >
                    <option value="">Select device...</option>
                    {allDevices.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.roomName})
                      </option>
                    ))}
                  </select>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    style={selectStyle}
                  >
                    {ACTION_OPTIONS.map((a) => (
                      <option key={a} value={a}>{ACTION_LABELS[a]}</option>
                    ))}
                  </select>
                  {action === 'set_speed' && (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          onClick={() => setActionValue(s)}
                          className="flex-1 py-1.5 rounded text-xs font-bold transition-all"
                          style={{
                            background: actionValue === s ? '#00BCD4' : '#1A1A35',
                            color: actionValue === s ? '#000' : '#AAA',
                            border: `1px solid ${actionValue === s ? '#00BCD4' : '#2A2A4A'}`,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAdd();
                }}
                disabled={!triggerDeviceId || !actionDeviceId || !ruleName.trim()}
                className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                style={{
                  background: (!triggerDeviceId || !actionDeviceId || !ruleName.trim()) ? '#1A1A35' : '#00BCD4',
                  color: (!triggerDeviceId || !actionDeviceId || !ruleName.trim()) ? '#555577' : '#000',
                  cursor: (!triggerDeviceId || !actionDeviceId || !ruleName.trim()) ? 'not-allowed' : 'pointer',
                }}
              >
                <Plus size={14} />
                Add Rule
              </motion.button>
            </div>

            {/* Existing rules */}
            <div className="space-y-2">
              <div className="text-sm font-bold" style={{ color: '#888899' }}>
                Active Rules ({automationRules.length})
              </div>
              {automationRules.length === 0 && (
                <div className="text-center py-6" style={{ color: '#444466' }}>
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-sm">No rules yet</div>
                </div>
              )}
              {automationRules.map((rule, i) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-xl"
                  style={{
                    background: rule.isEnabled ? '#0A1520' : '#0E0E22',
                    border: `1px solid ${rule.isEnabled ? '#1E3A5A' : '#1E1E3A'}`,
                    opacity: rule.isEnabled ? 1 : 0.6,
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{rule.name}</div>
                      <div className="text-xs mt-1" style={{ color: '#666688' }}>
                        <span style={{ color: '#9B59B6' }}>IF</span> {getDeviceName(rule.triggerDeviceId)}
                        {' '}
                        <span style={{ color: '#888899' }}>{CONDITION_LABELS[rule.triggerCondition]}</span>
                      </div>
                      <div className="text-xs" style={{ color: '#666688' }}>
                        <span style={{ color: '#00BCD4' }}>THEN</span> {ACTION_LABELS[rule.action]}
                        {' '}{getDeviceName(rule.actionDeviceId)}
                        {rule.actionValue !== undefined && ` (speed ${rule.actionValue})`}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#444466' }}>
                        📍 {getDeviceRoom(rule.actionDeviceId)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleAutomationRule(rule.id);
                        }}
                        title={rule.isEnabled ? 'Disable' : 'Enable'}
                        className="cursor-pointer"
                        style={{ cursor: 'pointer' }}
                      >
                        {rule.isEnabled ? (
                          <ToggleRight size={20} style={{ color: '#00BCD4' }} />
                        ) : (
                          <ToggleLeft size={20} style={{ color: '#444466' }} />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteAutomationRule(rule.id);
                        }}
                        title="Delete rule"
                        className="cursor-pointer"
                        style={{ cursor: 'pointer' }}
                      >
                        <Trash2 size={14} style={{ color: '#E94560' }} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
