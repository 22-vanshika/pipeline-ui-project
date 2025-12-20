import { useStore } from '@/features/pipeline/store';

const ACCENTS = {
  input: 'from-emerald-600/20 to-emerald-800/30 border-emerald-600/30',
  output: 'from-sky-600/20 to-sky-800/30 border-sky-600/30',
  service: 'from-violet-600/20 to-violet-800/30 border-violet-600/30',
  data: 'from-amber-600/20 to-amber-800/30 border-amber-600/30',
  logic: 'from-rose-600/20 to-rose-800/30 border-rose-600/30',
  default: 'from-stone-800 to-stone-900 border-stone-700/50',
};

const RINGS = {
  input: 'ring-emerald-400/40 hover:ring-emerald-300/50',
  output: 'ring-sky-400/40 hover:ring-sky-300/50',
  service: 'ring-violet-400/40 hover:ring-violet-300/50',
  data: 'ring-amber-400/40 hover:ring-amber-300/50',
  logic: 'ring-rose-400/40 hover:ring-rose-300/50',
  default: 'ring-stone-400/30 hover:ring-stone-300/40',
};

export const BaseNode = ({
  id,
  data,
  selected = false,
  style,
  title,
  subtitle,
  icon,
  category = 'default',
  config,
  children,
}) => {
  const { updateNodeData } = useStore();

  const accent = ACCENTS[category] || ACCENTS.default;
  const ring = RINGS[category] || RINGS.default;

  const renderField = (field) => {
    const commonClass =
      'p-2 rounded-md bg-black/20 border border-white/10 text-stone-50 placeholder-stone-300/60 focus:outline-none focus:ring-2 focus:ring-white/30';

    const value = data?.[field.key] ?? '';

    if (field.type === 'select') {
      return (
        <select
          value={value}
          onChange={(e) => updateNodeData(id, { [field.key]: e.target.value })}
          className={commonClass}
        >
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => updateNodeData(id, { [field.key]: e.target.value })}
          className={`${commonClass} resize-none min-h-[80px]`}
          placeholder={field.placeholder}
        />
      );
    }

    return (
      <input
        type={field.type}
        value={value}
        onChange={(e) => updateNodeData(id, { [field.key]: e.target.value })}
        className={commonClass}
        placeholder={field.placeholder}
      />
    );
  };

  return (
    <div
      className={`min-w-[275px] transition-all duration-200 text-stone-100 rounded-xl overflow-hidden border bg-gradient-to-b ${accent} ${selected ? `ring-2 ${ring}` : 'ring-0'} hover:ring-2 ${ring}`}
      style={style}
    >
      {/* Header */}
      <div className="p-3 border-b border-white/10 bg-gradient-to-r from-black/20 to-transparent">
        <div className="flex items-center gap-2">
          {icon ? <span className="text-stone-300">{icon}</span> : null}
          <div className="flex flex-col">
            <h3 className="text-lg font-display font-semibold tracking-wide">{title}</h3>
            {subtitle ? (
              <span className="text-[10px] text-stone-300/80 leading-tight">{subtitle}</span>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        {config?.fields?.length ? (
          <div className="flex flex-col gap-3">
            {config.fields.map((f) => (
              <label key={f.key} className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-stone-200/90">{f.label}</span>
                {renderField(f)}
              </label>
            ))}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};