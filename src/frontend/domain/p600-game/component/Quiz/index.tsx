// eslint-disable-next-line check-file/folder-naming-convention
import './quiz-style.css';
import './ResultStyle.css';
import './scoreStyle.css';

const Result = (props: { onShowResult: any; click: any; maxScore: any; score: any }) => {
  const { onShowResult, click, maxScore, score } = props;

  onShowResult();

  return (
    <div className="Result w3-container w3-center w3-animate-top">
      <h1>ผลลัพธ์</h1>
      <h3>
        คะแนนที่ได้ {score} จาก {maxScore}
      </h3>
      <div className="restart" onClick={click}>
        เริ่มใหม่
      </div>
    </div>
  );
};

const Quiz = (props: { Data: any; click: any }) => {
  const { Data, click } = props;

  const optionsElements = Data.Options.map((option: any) => {
    return (
      <div
        key={option.id}
        className="Answer"
        onClick={() => {
          click(option.isCorrect);
        }}
      >
        <h3>{option.text}</h3>
      </div>
    );
  });

  return (
    <div className="Quiz w3-container w3-center w3-animate-top">
      <h1>คำถาม</h1>
      <h2>{Data.text}</h2>
      {optionsElements}
    </div>
  );
};

const Score = (props: { score: any; hightScore: any }) => {
  const { score, hightScore } = props;

  return (
    <div className="Score w3-container w3-center w3-animate-top">
      <h1>Hightest Score : {hightScore}</h1>
      <h3>Score : {score}</h3>
    </div>
  );
};

export default { Result, Quiz, Score };
