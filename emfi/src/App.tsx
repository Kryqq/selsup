import React, { useState } from "react";

export interface Param {
  id: number;
  name: string;
  type: "string";
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
}

export interface Props {
  params: Param[];
  model: Model;
  onModelChange: (model: Model) => void;
}

const params = [
  {
    id: 1,
    name: "Назначение",
    type: "string" as const,
  },
  {
    id: 2,
    name: "Длина",
    type: "string" as const,
  },
];

const initialModel = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

const App: React.FC = () => {
  const [currentModel, setCurrentModel] = useState<Model>(initialModel);

  const handleModelChange = (newModel: Model) => {
    setCurrentModel(newModel);
  };

  const handleGetModel = () => {
    console.log("Current model:", currentModel);
  };

  return (
    <div>
      <h1>Редактор параметров</h1>
      <ParamEditor
        params={params}
        model={currentModel}
        onModelChange={handleModelChange}
      />
      <button onClick={handleGetModel}>Получить модель</button>
    </div>
  );
};

interface ParamInputProps {
  param: Param;
  value: string;
  onChange: (paramId: number, value: string) => void;
}

const ParamInput: React.FC<ParamInputProps> = ({ param, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(param.id, e.target.value);
  };

  return (
    <div>
      <label htmlFor={`param-${param.id}`}>{param.name}</label>
      <input
        id={`param-${param.id}`}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

const ParamEditor: React.FC<Props> = ({ params, model, onModelChange }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>([
    ...model.paramValues,
  ]);

  const handleParamChange = (paramId: number, value: string) => {
    const newParamValues = paramValues.map((pv) =>
      pv.paramId === paramId ? { ...pv, value } : pv
    );

    if (!newParamValues.some((pv) => pv.paramId === paramId)) {
      newParamValues.push({ paramId, value });
    }

    setParamValues(newParamValues);
    onModelChange({ ...model, paramValues: newParamValues });
  };

  return (
    <div>
      {params.map((param) => {
        const value =
          paramValues.find((pv) => pv.paramId === param.id)?.value || "";

        return (
          <ParamInput
            key={param.id}
            param={param}
            value={value}
            onChange={handleParamChange}
          />
        );
      })}
    </div>
  );
};

export default App;
