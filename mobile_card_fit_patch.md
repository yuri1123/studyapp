# 모바일 카드 화면 맞춤 패치

## 1) index.html
`</style>` 바로 위에 아래 CSS를 붙여넣으세요.

```css
/* v8 모바일 카드 한 화면 맞춤 */
@media(max-width:480px){
  .app{padding-bottom:72px}
  .topbar{padding:max(10px,env(safe-area-inset-top)) 11px 8px}
  .brand{font-size:17px;max-width:64vw}
  .brand small{font-size:9px;margin-top:2px}
  .selectorToggle{min-height:36px;padding:0 9px;font-size:11px;border-radius:12px}
  .content{padding:6px 6px 0}
  .cardShell{gap:8px}

  #cardScreen .headRow{min-height:30px}
  #cardScreen .badge{padding:6px 10px;font-size:11px}
  #cardScreen .progress{font-size:11px}

  .flipCard .face.front{
    padding:12px 16px 12px!important;
  }

  .flipCard.wordMode .face.front .unitTag{
    padding:6px 10px;
    font-size:11px;
    margin-bottom:8px;
  }

  .flipCard.wordMode .face.front .frontText{
    font-size:34px!important;
    line-height:1.08;
    margin-top:0!important;
  }

  .flipCard.wordMode .face.front .wordPron{
    font-size:15px;
    line-height:1.2;
    margin-top:7px;
    min-height:0;
  }

  .flipCard.wordMode .face.front .frontMeaning{
    margin-top:10px!important;
  }

  .flipCard.wordMode .face.front .meaningRow{
    grid-template-columns:46px 1fr;
    gap:8px;
    padding:8px 4px!important;
    font-size:16px;
    line-height:1.25;
  }

  .flipCard.wordMode .face.front .posTag{
    min-width:34px;
    padding:5px 7px;
    font-size:11px;
  }

  .flipCard.wordMode .face.front .flipTip{
    margin-top:8px!important;
    font-size:10px;
  }

  .memoryBtns{
    gap:6px;
    margin-top:0!important;
  }

  .memoryBtn{
    padding:9px 4px;
    border-radius:14px;
    font-size:12px;
  }

  #cardScreen .actions{gap:8px}

  #cardScreen .btn{
    padding:10px 12px;
    border-radius:14px;
    font-size:12px;
  }

  .bottomNav{
    padding:5px 8px calc(5px + env(safe-area-inset-bottom));
  }

  .navBtn{
    padding:6px 4px 5px;
    font-size:10px;
    gap:2px;
  }

  .navBtn b{font-size:17px}
}
```

## 2) service-worker.js
첫 줄을 아래처럼 바꾸세요.

기존:
```js
const CACHE='study-app-v7';
```

변경:
```js
const CACHE='study-app-v8';
```

이 패치는 360px급 모바일 브라우저 화면에서 카드 앞면 + 알아요/헷갈려요/모르겠어요 + 이전 카드/다음 카드 버튼이 하단 네비게이션 위에 들어오도록 간격과 카드 내부 요소를 압축합니다.
