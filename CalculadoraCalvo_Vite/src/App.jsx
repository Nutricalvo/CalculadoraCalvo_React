import { useState } from "react";

export default function CalculadoraCalvo() {
  const [etapa, setEtapa] = useState(1);
  const [condicao, setCondicao] = useState(null);
  const [sexo, setSexo] = useState("masculino");
  const [idade, setIdade] = useState(25);
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(175);
  const [atividade, setAtividade] = useState(1.55);
  const [massaMagra, setMassaMagra] = useState(60);

  const calcularTMB = () => {
    if (!condicao) return 0;
    const alturaCm = altura;

    switch (condicao) {
      case "harris":
        return sexo === "masculino"
          ? 66.5 + 13.75 * peso + 5.003 * alturaCm - 6.75 * idade
          : 655.1 + 9.563 * peso + 1.85 * alturaCm - 4.676 * idade;
      case "mifflin":
        return sexo === "masculino"
          ? 10 * peso + 6.25 * alturaCm - 5 * idade + 5
          : 10 * peso + 6.25 * alturaCm - 5 * idade - 161;
      case "tinsley":
        return 500 + 22 * massaMagra;
      case "cunningham":
        return 370 + 21.6 * massaMagra;
      default:
        return 0;
    }
  };

  const TMB = calcularTMB();
  const GET = TMB * atividade;

  if (etapa === 1) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Calculadora NutriCalvo 👨‍🦲</h1>
        <p className="mb-4">Qual dessas opções mais se aproxima do seu perfil atual?</p>
        <div className="space-y-2">
          <button onClick={() => { setCondicao("harris"); setEtapa(2); }} className="w-full bg-gray-100 p-3 rounded-xl">Tenho pouco peso/músculo</button>
          <button onClick={() => { setCondicao("harris"); setEtapa(2); }} className="w-full bg-gray-100 p-3 rounded-xl">Estou dentro do peso, com pouca variação</button>
          <button onClick={() => { setCondicao("mifflin"); setEtapa(2); }} className="w-full bg-gray-100 p-3 rounded-xl">Tenho sobrepeso ou obesidade</button>
          <button onClick={() => { setCondicao("tinsley"); setEtapa(2); }} className="w-full bg-gray-100 p-3 rounded-xl">Tenho bastante massa muscular (pique atleta)</button>
          <button onClick={() => { setCondicao("cunningham"); setEtapa(2); }} className="w-full bg-gray-100 p-3 rounded-xl">Faço esporte de endurance (corrida, triatlo, ciclismo...)</button>
        </div>
      </div>
    );
  }

  if (etapa === 2) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Calculadora NutriCalvo 👨‍🦲</h1>
        <div className="space-y-3">
          <div>
            <label className="block font-medium">Sexo:</label>
            <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full border rounded p-2 text-sm">
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Idade:</label>
            <input type="number" value={idade} onChange={(e) => setIdade(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium">Peso (kg):</label>
            <p className="text-sm text-gray-500">Se o seu peso for "quebrado", digite ao lado (ex.: 67,5 kg).</p>
            <div className="flex items-center gap-3">
              <input type="range" min="40" max="200" value={peso} onChange={(e) => setPeso(Number(e.target.value))} className="w-full" />
              <input type="number" value={peso} onChange={(e) => setPeso(Number(e.target.value))} className="w-20 border rounded p-1" />
              <span>kg</span>
            </div>
          </div>
          <div>
            <label className="block font-medium">Altura (cm):</label>
            <p className="text-sm text-gray-500">Se a sua altura for "quebrada", digite ao lado (ex.: 170,5 cm).</p>
            <div className="flex items-center gap-3">
              <input type="range" min="130" max="220" value={altura} onChange={(e) => setAltura(Number(e.target.value))} className="w-full" />
              <input type="number" value={altura} onChange={(e) => setAltura(Number(e.target.value))} className="w-20 border rounded p-1" />
              <span>cm</span>
            </div>
          </div>
          {(condicao === "tinsley" || condicao === "cunningham") && (
            <div>
              <label className="block font-medium">Massa magra estimada (kg):</label>
              <input type="number" value={massaMagra} onChange={(e) => setMassaMagra(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          )}
          <div>
            <label className="block font-medium mb-1">Nível de atividade:</label>
            <select value={atividade} onChange={(e) => setAtividade(Number(e.target.value))} className="w-full border rounded p-2 text-sm">
              <option value={1.2}>Sedentário - Pouco ou nenhum exercício</option>
              <option value={1.375}>Levemente ativo - Exercício leve 1–3 dias/semana</option>
              <option value={1.55}>Moderadamente ativo - Exercício moderado 3–5 dias/semana</option>
              <option value={1.725}>Muito ativo - Exercício intenso 6–7 dias/semana</option>
              <option value={1.9}>Extremamente ativo - Treinos 2x/dia ou físico + trabalho ativo</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Considere também sua rotina fora dos treinos: se trabalha sentado ou se passa a maior parte do dia em repouso, talvez seja mais indicado SUBESTIMAR o seu nível de atividade. Selecione um nível abaixo do que você selecionaria.</p>
          </div>
        </div>
        <button onClick={() => setEtapa(1)} className="mt-4 w-full bg-gray-200 p-2 rounded-xl">🔙 Voltar</button>
        <button onClick={() => setEtapa(3)} className="mt-2 w-full bg-green-500 text-white p-2 rounded-xl">📊 Ver resultado final</button>
      </div>
    );
  }

  if (etapa === 3) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Resultado Final 👨‍🦲</h1>
        <p className="mb-6 text-gray-700 text-sm">Esses valores servem como ponto de partida. Adaptar seu plano alimentar com acompanhamento profissional é sempre a melhor estratégia.</p>
        <div className="bg-gray-100 p-6 rounded-xl mb-6">
          <p className="text-xl font-semibold mb-1">Taxa Metabólica Basal (TMB):</p>
          <p className="text-2xl font-bold mb-4">{TMB.toFixed(0)} kcal</p>
          <p className="text-xl font-semibold mb-1">Gasto Energético Total (GET):</p>
          <p className="text-3xl font-bold mb-2">{GET.toFixed(0)} kcal</p>
        </div>
        <p className="mb-6 text-gray-700 text-sm">
          GET significa Gasto Energético Total, ou seja, a quantidade estimada de calorias que seu corpo gasta por dia considerando seu nível de atividade. Se quiser emagrecer, precisa consumir menos que esse valor. Se quiser ganhar peso, mais. Se quiser manter, use esse valor como referência. Lembrando: isso é uma ESTIMATIVA. Se quiser resultados mais otimizados e direcionados, considere adquirir meus Guias abaixo:
        </p>
        <div className="space-y-3">
          <a href="https://pay.kiwify.com.br/zgx01Yt" target="_blank" rel="noopener noreferrer" className="block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">📘 Adquira meu Guia de Emagrecimento Sustentável</a>
          <a href="https://pay.kiwify.com.br/c74VGfE" target="_blank" rel="noopener noreferrer" className="block bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">💊 Adquira meu Guia de Suplementação Simplificada</a>
        </div>
        <button onClick={() => setEtapa(1)} className="mt-6 block mx-auto text-sm text-gray-500 underline">Calcular novamente</button>
      </div>
    );
  }

  return null;
}