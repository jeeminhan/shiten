import { useState, useEffect, useRef } from "react";

const questions = [
  {
    scenario_jp: "友達が皆の前であなたのことをからかった。後で何て言う？",
    scenario_en: "Your friend made fun of you in front of everyone. What do you say to them later?",
    options: [
      { text: "何も言わない。波風を立てたくない", text_en: "Say nothing. I don't want to cause waves.", culture: "jp", weight: 2 },
      { text: "冗談っぽく返して、本当の気持ちは隠す", text_en: "Joke back, but hide how I really feel.", culture: "jp", weight: 1 },
      { text: "「あれ、ちょっと傷ついた」って正直に言う", text_en: "Tell them honestly — \"that actually hurt.\"", culture: "us", weight: 2 },
      { text: "その場で言い返す", text_en: "Call them out right there in front of everyone.", culture: "us", weight: 1 },
    ],
    cultural_jp: "和 (Wa)",
    cultural_jp_desc: "調和が最優先。自分が傷ついても、グループの平和を守る。",
    cultural_jp_desc_en: "Group harmony comes first. You absorb the hurt to keep the peace.",
    cultural_jp_right: "忠誠心と思いやり",
    cultural_jp_right_en: "Loyalty and consideration for others",
    cultural_jp_miss: "でも痛みが埋もれて、関係が本当には癒されない",
    cultural_jp_miss_en: "But the pain gets buried and the relationship never truly heals",
    cultural_us: "自己表現 / Authenticity",
    cultural_us_desc: "自分の気持ちを正直に伝えるべき。本音が大事。",
    cultural_us_desc_en: "You should be honest about how you feel. Being real matters.",
    cultural_us_right: "正直さには価値がある",
    cultural_us_right_en: "Honesty has real value",
    cultural_us_miss: "でも「自分の権利」のための正直さは、関係を壊すこともある",
    cultural_us_miss_en: "But honesty for 'my rights' can destroy a relationship instead of healing it",
    gospel_jp: "ある偉大な教師は、一番信頼していた弟子が間違った時、はっきりと「それは違う」と言いました。自分が正しいからではなく、その関係が大切だったから。そして、その弟子を見捨てませんでした。沈黙でもなく、攻撃でもなく。関係を守るための正直さ。もし、正直さと愛が対立するものではなく、同じものだとしたら？",
    gospel_en: "A great teacher once told his closest student directly — \"you're wrong.\" Not to win. Not to assert his rights. Because the relationship was worth fighting for. And he didn't abandon him afterward — he gave him the most important role of all. Not silence. Not attack. Honesty in service of the relationship. What if honesty and love aren't opposites — but the same thing?",
  },
  {
    scenario_jp: "グループで食べる場所を決めてる。皆が賛成してるけど、あなたは行きたくない。どうする？",
    scenario_en: "The group is picking where to eat. Everyone agrees but you don't want to go. What do you do?",
    options: [
      { text: "合わせる。自分の意見より空気が大事", text_en: "Go along with it. The group matters more than my preference.", culture: "jp", weight: 2 },
      { text: "行くけど、内心ちょっとモヤモヤする", text_en: "Go, but feel a little frustrated inside.", culture: "jp", weight: 1 },
      { text: "「別のところはどう？」って提案する", text_en: "Suggest somewhere else — \"how about this place instead?\"", culture: "us", weight: 1 },
      { text: "はっきり「そこは嫌だ」って言う", text_en: "Say clearly that I don't want to go there.", culture: "us", weight: 2 },
    ],
    cultural_jp: "空気を読む (Kuuki wo Yomu)",
    cultural_jp_desc: "空気を読んで、グループの流れを乱さない。自分の好みは二の次。",
    cultural_jp_desc_en: "Read the room. Your preferences are secondary to the group's flow.",
    cultural_jp_right: "他者への配慮と気遣い",
    cultural_jp_right_en: "Deep consideration for others",
    cultural_jp_miss: "でも自分自身が消えていく。自分の声が聞こえなくなる",
    cultural_jp_miss_en: "But you slowly disappear. You stop hearing your own voice",
    cultural_us: "個人の意見 / Individual Voice",
    cultural_us_desc: "自分の意見は大事。はっきり言うのは健全で当たり前のこと。",
    cultural_us_desc_en: "Your opinion matters. Speaking up is healthy and expected.",
    cultural_us_right: "自分の声には価値がある",
    cultural_us_right_en: "Your voice has value",
    cultural_us_miss: "でも「自分の好み最優先」は、わがままにもなり得る",
    cultural_us_miss_en: "But 'my preference first' can become selfishness",
    gospel_jp: "ある物語では、何百人もの群衆の中を歩いている教師が、たった一人の女性のために立ち止まりました。彼女は群衆の一部ではなく、個人として大切だったのです。でもその教師自身も、自分の好みよりも他者のために自分の人生を捧げることを選びました。あなたは「群衆の中の一人」ではない。でも同時に、自分の好みだけが世界でもない。愛されている個人が、自由に他者のために生きる。そこに本当の自由があるのかもしれません。",
    gospel_en: "In one story, a teacher walking through a crowd of hundreds stopped for one single woman. She wasn't part of the crowd — she mattered individually. But that same teacher also chose to give up his own preferences for the sake of others. You're not background noise. But your preferences aren't the center of the universe either. Maybe true freedom is being someone who is deeply valued as an individual — and freely chooses to love others. Not erasure. Not selfishness. Chosen love.",
  },
  {
    scenario_jp: "テストでいい点を取った。でも仲良い友達は落ちた。「どうだった？」って聞かれたら何て答える？",
    scenario_en: "You got a good grade but your close friend failed. They ask how you did. What do you say?",
    options: [
      { text: "「まあまあだった」ってごまかす", text_en: "Downplay it — \"it was okay I guess.\"", culture: "jp", weight: 2 },
      { text: "話題を変える", text_en: "Change the subject.", culture: "jp", weight: 1 },
      { text: "正直に言うけど、相手を励ます", text_en: "Tell the truth but encourage them.", culture: "us", weight: 1 },
      { text: "普通に「良かったよ！」って言う", text_en: "Just say \"I did great!\" — why hide it?", culture: "us", weight: 2 },
    ],
    cultural_jp: "出る杭は打たれる (Deru Kui)",
    cultural_jp_desc: "目立つ杭は打たれる。人より上に出ることはグループを脅かす。",
    cultural_jp_desc_en: "The nail that sticks out gets hammered down. Don't outshine others.",
    cultural_jp_right: "他者の痛みへの敏感さ",
    cultural_jp_right_en: "Sensitivity to others' pain",
    cultural_jp_miss: "でも恐れの中で自分を小さくし続けることになる",
    cultural_jp_miss_en: "But you end up shrinking yourself out of fear",
    cultural_us: "成功を祝う / Celebrate Success",
    cultural_us_desc: "努力の結果は誇っていい。成功はオープンに共有すべき。",
    cultural_us_desc_en: "You earned it. Be proud. Success should be shared openly.",
    cultural_us_right: "自分を偽らなくていい",
    cultural_us_right_en: "You don't have to fake who you are",
    cultural_us_miss: "でも無神経な自慢になることもある",
    cultural_us_miss_en: "But it can become insensitive boasting",
    gospel_jp: "ある物語で、主人が三人の使用人にそれぞれ違う量のものを預けました。二人はそれを活かし、一人は恐れて隠しました。主人は隠した人にこう言いました。「なぜ隠したのか？」でも、うまく使った二人も自慢はしませんでした。それは元々自分のものではなかったから。自分の持っているものを隠すのは謙虚さではなく恐れ。でも自慢するのも間違い。なぜなら、そもそもそれは贈り物だから。プライドも恐れもなく、ただ自由がある場所。",
    gospel_en: "In one story, a master entrusted three people with different amounts. Two used what they were given. One buried his out of fear. The master was upset with the one who hid — not the amounts. But the two who succeeded didn't boast either, because it was never theirs to begin with. Hiding what you have isn't humility — it's fear. But boasting isn't right either — because it was a gift. What if there's a place with no pride and no fear? Just freedom.",
  },
  {
    scenario_jp: "大変な時期なのに、友達に「大丈夫？」って聞かれた。本当は大丈夫じゃない。何て答える？",
    scenario_en: "You're going through a hard time. A friend asks \"are you okay?\" You're not. What do you say?",
    options: [
      { text: "「大丈夫！」って笑って言う", text_en: "Smile and say \"I'm fine!\"", culture: "jp", weight: 2 },
      { text: "「ちょっと疲れてるだけ」って軽く言う", text_en: "Say \"just a little tired\" — keep it light.", culture: "jp", weight: 1 },
      { text: "「実はちょっと辛い」って少し本音を見せる", text_en: "Show a little honesty — \"actually, it's been rough.\"", culture: "us", weight: 1 },
      { text: "全部正直に話す", text_en: "Tell them everything honestly.", culture: "us", weight: 2 },
    ],
    cultural_jp: "我慢 (Gaman)",
    cultural_jp_desc: "黙って耐える。自分の問題で他人に迷惑をかけない。",
    cultural_jp_desc_en: "Endure silently. Don't burden others with your problems.",
    cultural_jp_right: "他者への思いやり、迷惑をかけたくない気持ち",
    cultural_jp_right_en: "Consideration — not wanting to burden others",
    cultural_jp_miss: "でも孤独に押しつぶされる。一人で全部抱える",
    cultural_jp_miss_en: "But you get crushed by isolation. You carry everything alone",
    cultural_us: "弱さを見せる / Vulnerability",
    cultural_us_desc: "辛い時は正直に言うべき。弱さを見せることが信頼を築く。",
    cultural_us_desc_en: "Being open about struggles is healthy. Vulnerability builds trust.",
    cultural_us_right: "正直さは癒しにつながる",
    cultural_us_right_en: "Honesty can lead to healing",
    cultural_us_miss: "でも「弱さを見せること」自体がパフォーマンスになることもある",
    cultural_us_miss_en: "But vulnerability can become performative — sharing for attention, not healing",
    gospel_jp: "ある偉大な教師が、人生で最も辛い夜に、友人たちにこう言いました。「心が張り裂けそうだ。ここにいてくれ。」強さを演じなかった。でも、注目を集めるためでもなかった。ただ、信頼できる人に本当のことを言った。強さのパフォーマンスでもなく、弱さのパフォーマンスでもなく。ただ、知られている安心感。もし、誰にも迷惑をかけずに、でも完全に正直でいられる場所があるとしたら？",
    gospel_en: "On the hardest night of his life, a great teacher told his closest friends: \"My heart is breaking. Stay with me.\" He didn't perform strength. But he wasn't performing weakness either — he wasn't sharing for attention. He simply told the truth to people he trusted. Not performing strength. Not performing vulnerability. Just being known. What if there's a place where you can be completely honest — without being a burden?",
  },
  {
    scenario_jp: "先輩に頼まれたけど、正直やりたくない。断れる？",
    scenario_en: "A senpai asks you to do something. You really don't want to. Can you say no?",
    options: [
      { text: "絶対断れない。先輩だから", text_en: "Absolutely not. They're senpai.", culture: "jp", weight: 2 },
      { text: "やるけど、少し不満に思う", text_en: "I'd do it but feel resentful.", culture: "jp", weight: 1 },
      { text: "理由を説明して丁寧に断る", text_en: "Politely explain why I can't and decline.", culture: "us", weight: 1 },
      { text: "「無理です」ってはっきり言う", text_en: "Just say \"I can't\" — my time matters too.", culture: "us", weight: 2 },
    ],
    cultural_jp: "先輩後輩 (Senpai-Kōhai)",
    cultural_jp_desc: "上下関係は社会の基盤。目上の人には従う。",
    cultural_jp_desc_en: "Hierarchy is the social contract. You defer to those above you.",
    cultural_jp_right: "敬意、構造、先輩から学ぶ姿勢",
    cultural_jp_right_en: "Respect, structure, learning from those with experience",
    cultural_jp_miss: "でも価値が地位に縛られ、上からの圧力が抑圧になる",
    cultural_jp_miss_en: "But your worth gets tied to your rank, and pressure from above becomes oppression",
    cultural_us: "平等 / Equality",
    cultural_us_desc: "みんなの時間は平等に大切。断ることは健全なこと。",
    cultural_us_desc_en: "Everyone's time matters equally. Saying no is healthy.",
    cultural_us_right: "地位に関係なく人としての尊厳",
    cultural_us_right_en: "Dignity regardless of position",
    cultural_us_miss: "でも知恵や権威への敬意を失い、メンターシップが壊れることもある",
    cultural_us_miss_en: "But can lose respect for wisdom and authority, breaking mentorship",
    gospel_jp: "歴史上最も影響力のあるリーダーの一人は、弟子たちの前でひざまずき、足を洗いました。一番上にいる人が、一番下の仕事をした。権威はあった。でもその権威を、要求するためではなく、仕えるために使った。階層を壊したのではなく、逆転させた。もし、本当のリーダーシップが命令することではなく仕えることだとしたら？上に立つ人が下に降りてくる世界。そこでは従うことも命令することも、全く違う意味を持つ。",
    gospel_en: "One of the most influential leaders in history knelt before his students and washed their feet — the lowest task. He had authority. But he used it to serve, not to demand. He didn't destroy hierarchy — he inverted it. What if true leadership isn't commanding from above but serving from below? In that world, both obedience and authority mean something completely different.",
  },
  {
    scenario_jp: "親にある決断を伝えた。「ふーん、そう」って言われた。あのトーンで。次にどうする？",
    scenario_en: "You told your parents about a decision. They said \"hmm, is that so\" in that tone. What do you do next?",
    options: [
      { text: "決断を変えるかもしれない", text_en: "I might change my decision.", culture: "jp", weight: 2 },
      { text: "何も言わないけど、ずっと気になる", text_en: "Say nothing, but carry the weight of their silence.", culture: "jp", weight: 1 },
      { text: "「本当はどう思ってるの？」って聞く", text_en: "Ask them directly — \"what do you really think?\"", culture: "us", weight: 1 },
      { text: "自分の決断を信じて進む", text_en: "Trust my decision and move forward.", culture: "us", weight: 2 },
    ],
    cultural_jp: "甘え (Amae)",
    cultural_jp_desc: "愛情は言葉にしない。失望は沈黙で伝わる。察するのが当然。",
    cultural_jp_desc_en: "Love is unspoken. Disappointment is communicated through silence.",
    cultural_jp_right: "感情の深さ、直感的な絆",
    cultural_jp_right_en: "Emotional depth and intuitive bonds",
    cultural_jp_miss: "でも言葉にされない傷が、ずっと癒されないまま残る",
    cultural_jp_miss_en: "But unspoken wounds never get addressed and never heal",
    cultural_us: "直接的な対話 / Direct Communication",
    cultural_us_desc: "言いたいことがあるなら、はっきり言うべき。",
    cultural_us_desc_en: "If you have something to say, say it clearly.",
    cultural_us_right: "明確さが誤解を防ぐ",
    cultural_us_right_en: "Clarity prevents misunderstanding",
    cultural_us_miss: "でも率直さが無神経になり、感情の深みが失われることもある",
    cultural_us_miss_en: "But directness can feel blunt, transactional, and emotionally shallow",
    gospel_jp: "ある有名な物語。息子が家を出て、全てを失い、恥を抱えて帰ってきました。沈黙の失望で迎えられたでしょうか？いいえ。父親は走って迎えに行き、抱きしめ、パーティーを開きました。でもただ「大丈夫だよ」と軽く言ったわけでもない。深い感情と、はっきりとした行動の両方があった。沈黙でもなく、ただの率直さでもなく。深さと明確さが一緒にある愛。もし愛が、察することでも宣言することでもなく、走り寄ることだとしたら？",
    gospel_en: "A famous story: a son left home, lost everything, came back in shame. Was he met with silent disappointment? No. His father ran to him, embraced him, threw a celebration. But it wasn't casual either — \"hey, no big deal.\" It had emotional depth AND clear action. Not silence. Not bluntness. Both depth and clarity together. What if love isn't reading the room or making declarations — but running toward someone?",
  },
  {
    scenario_jp: "サークルに入ったけど、もう楽しくない。でももう約束しちゃった。辞める？",
    scenario_en: "You joined a club but you're not enjoying it anymore. You already committed though. Do you quit?",
    options: [
      { text: "辞めない。約束は約束", text_en: "No way. A commitment is a commitment.", culture: "jp", weight: 2 },
      { text: "最後まで続けるけど、最低限だけやる", text_en: "Stay but do the bare minimum.", culture: "jp", weight: 1 },
      { text: "正直に説明して辞める", text_en: "Explain honestly and leave.", culture: "us", weight: 1 },
      { text: "自分のために辞める。自分の時間は大切", text_en: "Quit for myself. My time matters.", culture: "us", weight: 2 },
    ],
    cultural_jp: "頑張る (Ganbaru)",
    cultural_jp_desc: "耐え続けることが美徳。辞めることは人格の弱さを意味する。",
    cultural_jp_desc_en: "Endurance is moral virtue. Quitting means weak character.",
    cultural_jp_right: "忍耐力と責任感",
    cultural_jp_right_en: "Perseverance and responsibility",
    cultural_jp_miss: "でも休むことが不可能になり、アイデンティティが耐えることに縛られる",
    cultural_jp_miss_en: "But rest becomes impossible and your identity gets trapped in endurance",
    cultural_us: "セルフケア / Self-Care",
    cultural_us_desc: "辞め時を知るのは知恵。メンタルヘルスが最優先。",
    cultural_us_desc_en: "Knowing when to quit is wisdom. Mental health comes first.",
    cultural_us_right: "自己認識と限界を知ること",
    cultural_us_right_en: "Self-awareness and knowing your limits",
    cultural_us_miss: "でも困難なことを全て避け、コミットメントが浅くなることもある",
    cultural_us_miss_en: "But can become avoiding anything hard and never committing deeply",
    gospel_jp: "ある古い物語では、世界を創った存在が六日間で全てを作り、七日目に休みました。疲れたからではなく、休むことが世界の設計の一部だったから。でも六日間は全力で働いた。怠けて休んだのではない。力を尽くした後で休んだ。「もっと頑張れ」でもなく、「嫌ならやめろ」でもなく。全力を出すことと、休むことの両方が設計されている。もし忍耐と休息が対立するものではなく、両方ともデザインだとしたら？",
    gospel_en: "In an ancient story, the creator made everything in six days — then rested on the seventh. Not because he was tired. Because rest was part of the design. But he also worked fully for six days. He didn't rest out of laziness. He rested after giving everything. Not \"push harder\" and not \"quit if it's hard.\" Both full effort and real rest were designed in. What if perseverance and rest aren't opposites — but both part of the blueprint?",
  },
  {
    scenario_jp: "一人でご飯食べてるところをクラスメートに見られた。気まずい？",
    scenario_en: "A classmate sees you eating alone. Is that awkward?",
    options: [
      { text: "かなり気まずい。一人に見られたくない", text_en: "Very awkward. I don't want to be seen alone.", culture: "jp", weight: 2 },
      { text: "ちょっと気になるけど、平気なフリをする", text_en: "A little uncomfortable — I'd pretend I'm fine.", culture: "jp", weight: 1 },
      { text: "別に気にしない", text_en: "Don't really care.", culture: "us", weight: 1 },
      { text: "一人の時間は好き。むしろ最高", text_en: "I love alone time. It's the best.", culture: "us", weight: 2 },
    ],
    cultural_jp: "集団意識 (Shuudan Ishiki)",
    cultural_jp_desc: "集団の中にいることが普通。一人でいることは社会的な失敗のサイン。",
    cultural_jp_desc_en: "Being alone in public signals something is wrong with you socially.",
    cultural_jp_right: "コミュニティと帰属感の大切さ",
    cultural_jp_right_en: "Community and belonging matter",
    cultural_jp_miss: "でも帰属が義務になり、一人の時間が恥になる",
    cultural_jp_miss_en: "But belonging becomes obligation and solitude becomes shame",
    cultural_us: "自立 / Independence",
    cultural_us_desc: "一人でいることは自立の証。誰かに認めてもらう必要はない。",
    cultural_us_desc_en: "Being alone is self-sufficient. You don't need validation.",
    cultural_us_right: "自分自身と向き合える強さ",
    cultural_us_right_en: "Strength to be comfortable with yourself",
    cultural_us_miss: "でも孤立を美化し、本当のつながりを避けることもある",
    cultural_us_miss_en: "But can romanticize isolation and avoid real connection",
    gospel_jp: "ある教師は、五千人に注目された最も輝かしい瞬間の直後に、一人で山に登りました。でもその前の日は、群衆の中で一人一人と深く関わっていました。孤独を選び、同時にコミュニティも選んだ。一人でいることは失敗でも、偉さの証明でもなかった。群衆の中にいることも、義務でも弱さでもなかった。両方が必要だった。もし、一人の時間とみんなとの時間の両方が、同じくらい大切だとしたら？",
    gospel_en: "A teacher, right after his biggest public moment — thousands watching — went up a mountain alone. But the day before, he'd been deeply present with every person in the crowd. He chose solitude AND community. Being alone wasn't failure or a flex. Being with people wasn't obligation or weakness. He needed both. What if alone time and together time are both equally valuable — and neither one is the whole picture?",
  },
  {
    scenario_jp: "友達に傷つくことを言ってしまった。謝りたいけど、気まずくなるのが怖い。どうする？",
    scenario_en: "You said something hurtful to a friend. You want to apologize but afraid it'll make things awkward. What do you do?",
    options: [
      { text: "何もしない。時間が解決してくれるはず", text_en: "Do nothing. Time will fix it.", culture: "jp", weight: 2 },
      { text: "普通に接して、なかったことにする", text_en: "Act normal and pretend it didn't happen.", culture: "jp", weight: 1 },
      { text: "LINEで軽く「さっきはごめん」って送る", text_en: "Send a casual \"sorry about earlier\" message.", culture: "us", weight: 1 },
      { text: "直接会って、ちゃんと謝る", text_en: "Meet face to face and apologize properly.", culture: "us", weight: 2 },
    ],
    cultural_jp: "和 (Wa)",
    cultural_jp_desc: "表面的な調和を守ることが、根本的な解決より大事。",
    cultural_jp_desc_en: "Preserving surface harmony matters more than resolving what's underneath.",
    cultural_jp_right: "忍耐と、全てに対処する必要はないという知恵",
    cultural_jp_right_en: "Patience and the wisdom that not everything needs confrontation",
    cultural_jp_miss: "でも傷が表面の下で腐っていく",
    cultural_jp_miss_en: "But the wound festers underneath the surface",
    cultural_us: "問題解決 / Resolution",
    cultural_us_desc: "問題は直接向き合うべき。避けることは事態を悪化させる。",
    cultural_us_desc_en: "Problems should be addressed directly. Avoidance makes things worse.",
    cultural_us_right: "問題に向き合うことは成長につながる",
    cultural_us_right_en: "Facing problems leads to growth",
    cultural_us_miss: "でも「正しくあること」が「和解すること」より優先されることもある",
    cultural_us_miss_en: "But being right can become more important than being reconciled",
    gospel_jp: "ある考え方では、世界で最も大きな「仲直り」は、問題を無視した人によってではなく、議論に勝った人によってでもなく、自分から最も高い代償を払って関係を修復した人によって起きたと言います。正しさを証明するためではなく、関係を取り戻すために痛みの中に入った。問題を避けることでもなく、議論に勝つことでもなく。犠牲を払って関係を修復すること。本当の平和は、避けることからも、正しさの証明からも生まれないのかもしれません。",
    gospel_en: "There's a belief that the greatest reconciliation in history didn't come from someone who ignored the problem, or from someone who won the argument. It came from someone who entered the pain at the highest personal cost — not to be right, but to restore the relationship. Not avoidance. Not winning. Sacrifice for the sake of making things whole. Maybe real peace doesn't come from avoiding the mess OR from proving your point. Maybe it comes from paying the cost to fix it.",
  },
  {
    scenario_jp: "頑張って頑張って、でも結果が出なかった。誰にも言えない。なぜだと思う？",
    scenario_en: "You tried your hardest but it didn't work out. You can't tell anyone. Why do you think that is?",
    options: [
      { text: "頑張りが足りなかったと思われるのが怖い", text_en: "I'm afraid they'll think I didn't try hard enough.", culture: "jp", weight: 2 },
      { text: "迷惑をかけたくない", text_en: "I don't want to be a burden to anyone.", culture: "jp", weight: 1 },
      { text: "失敗しても次に活かせばいい", text_en: "Failure is just data — learn from it and move on.", culture: "us", weight: 1 },
      { text: "普通に話す。失敗は恥ずかしいことじゃない", text_en: "I'd talk about it openly. Failure isn't shameful.", culture: "us", weight: 2 },
    ],
    cultural_jp: "頑張る＋恥 (Ganbaru + Haji)",
    cultural_jp_desc: "努力が自分の価値を決めるなら、失敗の恥は耐えられない。",
    cultural_jp_desc_en: "If effort defines your worth, the shame of failure is unbearable.",
    cultural_jp_right: "努力を大切にすること",
    cultural_jp_right_en: "Valuing hard work and effort",
    cultural_jp_miss: "でも価値がアウトプットに縛られ、失敗が存在の危機になる",
    cultural_jp_miss_en: "But worth gets tied to output and failure becomes an identity crisis",
    cultural_us: "成長マインドセット / Growth Mindset",
    cultural_us_desc: "失敗はフィードバック。自分の問題ではなく、プロセスの問題。",
    cultural_us_desc_en: "Failure is feedback. It's about the process, not about you.",
    cultural_us_right: "回復力と前に進む力",
    cultural_us_right_en: "Resilience and moving forward",
    cultural_us_miss: "でも本当の痛みを軽視し、全てを「学びの機会」にしてしまうことも",
    cultural_us_miss_en: "But can minimize real pain and turn everything into a 'learning opportunity' without sitting in it",
    gospel_jp: "ある人が、自分の弱さを取り除いてほしいと三回願いました。返ってきた答えは「私の力は、あなたの弱さの中でこそ最も強く現れる」でした。弱さは最適化すべきデータでもなく、一人で抱える恥でもなかった。それは、何か自分より大きなものが現れる場所だった。強さを演じる必要もなく、失敗を「成長」にリブランドする必要もなく。ただ、最も弱い場所で何かに支えられること。もし、あなたの最も辛い瞬間が、見捨てられる瞬間でも学びの機会でもなく、最も深く支えられる瞬間だとしたら？",
    gospel_en: "A man begged three times for his weakness to be taken away. The answer: \"My power shows up most in your weakness.\" His weakness wasn't data to optimize. It wasn't shame to carry alone. It was where something bigger than him showed up. No need to perform strength. No need to rebrand failure as \"growth.\" Just being held in the weakest place. What if your lowest moment isn't where you're abandoned, and isn't a learning opportunity — but where you're most deeply held?",
  }
];

const PHASE = { INTRO: 0, QUIZ: 1, RESULT: 2 };

export default function TwoLensesQuiz() {
  const [phase, setPhase] = useState(PHASE.INTRO);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showingTransition, setShowingTransition] = useState(false);
  const [reviewCard, setReviewCard] = useState(null);
  const containerRef = useRef(null);

  const jpScore = answers.reduce((s, a) => s + (a.culture === "jp" ? a.weight : 0), 0);
  const usScore = answers.reduce((s, a) => s + (a.culture === "us" ? a.weight : 0), 0);
  const total = jpScore + usScore || 1;
  const jpPct = Math.round((jpScore / total) * 100);
  const usPct = 100 - jpPct;

  const handleSelect = (option, idx) => {
    setSelectedOption(idx);
    setTimeout(() => {
      setShowingTransition(true);
      setAnswers([...answers, option]);
      setTimeout(() => {
        if (current < questions.length - 1) { setCurrent(current + 1); setSelectedOption(null); setShowingTransition(false); }
        else { setPhase(PHASE.RESULT); setShowingTransition(false); }
      }, 400);
    }, 350);
  };

  const getProfile = () => {
    if (jpPct >= 75) return { tj: "和の心", te: "Heart of Harmony", dj: "あなたは自然とグループを優先し、痛みを受け止め、平和を守ります。深い忠誠心と気配りが強み。ただ、自分の声が自分にさえ聞こえなくなることもあるかもしれません。", de: "You instinctively prioritize the group, absorb discomfort, and keep the peace. Deep loyalty and sensitivity are your strengths — but your own voice often goes unheard, even by yourself." };
    if (jpPct >= 55) return { tj: "二つの世界の間", te: "Between Two Worlds", dj: "調和への意識が強い一方で、本音を言いたい気持ちもあります。両方が分かるからこそ、どちらも重く感じることがあるかもしれません。", de: "You lean toward harmony but part of you wants to speak up. You understand both instincts — sometimes the Japanese way feels heavy, sometimes the American way feels selfish." };
    if (usPct >= 75) return { tj: "自分の道", te: "Your Own Path", dj: "正直さと自己表現を大切にします。でもその自由が時に、アンカーのない孤独に感じることもあるかもしれません。", de: "You lean toward honesty and individual expression. But sometimes that independence can feel isolating — like freedom without an anchor." };
    return { tj: "二つのレンズ", te: "Two Lenses", dj: "二つの文化のレンズをほぼ均等に持っています。その間の緊張は問題ではなく、最も深い問いが生まれる場所です。", de: "You see through both lenses almost equally. The tension between them isn't a problem — it's where the deepest questions live." };
  };

  const reset = () => { setPhase(PHASE.INTRO); setCurrent(0); setAnswers([]); setSelectedOption(null); setShowingTransition(false); setReviewCard(null); };

  useEffect(() => { if (containerRef.current) containerRef.current.scrollTo?.({ top: 0, behavior: 'smooth' }); }, [current, phase, reviewCard]);

  const q = questions[current];
  const p = getProfile();

  return (
    <div ref={containerRef} style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f7f5ef 0%, #ede8dc 100%)", fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', system-ui, sans-serif", color: "#2d2d2d", overflow: "auto" }}>
      <div style={{ position: "fixed", top: -120, right: -120, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,163,90,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 20px" }}>

        {phase === PHASE.INTRO && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", animation: "fadeUp 0.8s ease-out" }}>
            <div style={{ fontSize: 12, color: "#b5a272", letterSpacing: 4, marginBottom: 20, fontWeight: 500 }}>TWO LENSES</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.4, margin: "0 0 4px" }}>日本とアメリカ</h1>
            <h2 style={{ fontSize: 15, fontWeight: 400, color: "#999", margin: "0 0 32px" }}>文化の違いテスト</h2>
            <div style={{ width: 40, height: 1, background: "#c4a35a", margin: "0 auto 28px" }} />
            <p style={{ fontSize: 14, lineHeight: 1.9, color: "#666", maxWidth: 360, margin: "0 auto 6px" }}>10のシナリオに答えて、あなたの文化的な視点を発見しましょう。</p>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: "#666", maxWidth: 360, margin: "0 auto 20px" }}>正解も不正解もありません。</p>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#aaa", maxWidth: 340, margin: "0 auto 44px" }}>Answer 10 scenarios and discover your cultural perspective. No right or wrong answers.</p>
            <button onClick={() => setPhase(PHASE.QUIZ)} style={{ padding: "14px 48px", borderRadius: 28, border: "none", background: "#2d2d2d", color: "#f7f5ef", fontSize: 14, fontWeight: 500, cursor: "pointer", letterSpacing: 1, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 24px rgba(0,0,0,0.15)"; }} onMouseOut={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"; }}>はじめる / Start</button>
          </div>
        )}

        {phase === PHASE.QUIZ && (
          <div style={{ paddingTop: 48, paddingBottom: 60, opacity: showingTransition ? 0 : 1, transform: showingTransition ? "translateY(10px)" : "", transition: "opacity 0.35s, transform 0.35s" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 12 }}>
              <span style={{ fontSize: 11, color: "#b5a272", fontWeight: 600, minWidth: 36 }}>{current + 1} / {questions.length}</span>
              <div style={{ flex: 1, height: 2, background: "#e0dbd0", borderRadius: 1, overflow: "hidden" }}><div style={{ height: "100%", background: "#c4a35a", width: `${((current + 1) / questions.length) * 100}%`, transition: "width 0.5s" }} /></div>
            </div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.7, margin: "0 0 8px" }}>{q.scenario_jp}</p>
              <p style={{ fontSize: 13, color: "#999", lineHeight: 1.6, margin: 0 }}>{q.scenario_en}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((o, i) => (
                <button key={i} onClick={() => selectedOption === null && handleSelect(o, i)} style={{ padding: "16px 20px", borderRadius: 12, border: selectedOption === i ? "2px solid #c4a35a" : "1px solid #e0dbd0", background: selectedOption === i ? "linear-gradient(135deg,#faf6ed,#f5eedf)" : "#fff", cursor: selectedOption === null ? "pointer" : "default", textAlign: "left", transition: "all 0.25s", boxShadow: selectedOption === i ? "0 2px 12px rgba(196,163,90,0.15)" : "0 1px 4px rgba(0,0,0,0.04)", transform: selectedOption === i ? "scale(1.01)" : "" }} onMouseOver={e => { if (selectedOption === null) { e.currentTarget.style.borderColor = "#c4a35a"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(196,163,90,0.1)"; }}} onMouseOut={e => { if (selectedOption !== i) { e.currentTarget.style.borderColor = "#e0dbd0"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}}>
                  <div style={{ fontSize: 14, lineHeight: 1.6, fontWeight: 450 }}>{o.text}</div>
                  <div style={{ fontSize: 11.5, color: "#bbb", lineHeight: 1.5, marginTop: 3 }}>{o.text_en}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === PHASE.RESULT && reviewCard === null && (
          <div style={{ paddingTop: 48, paddingBottom: 60, animation: "fadeUp 0.6s ease-out" }}>
            <div style={{ fontSize: 12, color: "#b5a272", letterSpacing: 3, marginBottom: 20, fontWeight: 500 }}>あなたの結果 / YOUR RESULTS</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>{p.tj}</h2>
            <h3 style={{ fontSize: 15, fontWeight: 400, color: "#999", margin: "0 0 24px" }}>{p.te}</h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.9, color: "#555", margin: "0 0 8px" }}>{p.dj}</p>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: "#aaa", margin: "0 0 32px" }}>{p.de}</p>
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "#c4a35a", fontWeight: 500 }}>🇯🇵 日本的 {jpPct}%</span>
                <span style={{ fontSize: 12, color: "#3a5a8b", fontWeight: 500 }}>{usPct}% アメリカ的 🇺🇸</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, overflow: "hidden", background: "#e8e4d8", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${jpPct}%`, background: "linear-gradient(90deg,#c4a35a,#dabb6a)", borderRadius: 4, transition: "width 1s" }} />
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${usPct}%`, background: "linear-gradient(90deg,#6a8abb,#3a5a8b)", borderRadius: 4, transition: "width 1s" }} />
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#b5a272", letterSpacing: 2, marginBottom: 14, fontWeight: 500 }}>各質問を探る / EXPLORE EACH QUESTION</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
              {questions.map((qq, i) => { const a = answers[i]; const j = a?.culture === "jp"; return (
                <button key={i} onClick={() => setReviewCard(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 10, border: "1px solid #e8e4d8", background: "#fff", cursor: "pointer", textAlign: "left", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }} onMouseOver={e => { e.currentTarget.style.borderColor = "#c4a35a"; e.currentTarget.style.transform = "translateX(4px)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = "#e8e4d8"; e.currentTarget.style.transform = ""; }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: j ? "linear-gradient(135deg,#f5eedd,#e8d9b5)" : "linear-gradient(135deg,#e0eaf5,#b5cce5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0, color: j ? "#a08840" : "#3a5a8b" }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.4 }}>{qq.scenario_jp.length > 25 ? qq.scenario_jp.slice(0, 25) + "…" : qq.scenario_jp}</div>
                    <div style={{ fontSize: 10.5, color: "#ccc", marginTop: 2 }}>{j ? qq.cultural_jp : qq.cultural_us}</div>
                  </div>
                  <div style={{ fontSize: 16, color: "#ccc" }}>→</div>
                </button>
              ); })}
            </div>
            <button onClick={reset} style={{ padding: "12px 36px", borderRadius: 24, border: "1px solid #ddd", background: "transparent", color: "#999", fontSize: 13, cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => { e.target.style.borderColor = "#c4a35a"; e.target.style.color = "#c4a35a"; }} onMouseOut={e => { e.target.style.borderColor = "#ddd"; e.target.style.color = "#999"; }}>もう一度やる / Try Again</button>
          </div>
        )}

        {phase === PHASE.RESULT && reviewCard !== null && (() => {
          const r = questions[reviewCard]; const a = answers[reviewCard]; const j = a?.culture === "jp";
          return (
            <div style={{ paddingTop: 48, paddingBottom: 60, animation: "fadeUp 0.5s ease-out" }}>
              <button onClick={() => setReviewCard(null)} style={{ background: "none", border: "none", color: "#b5a272", fontSize: 13, cursor: "pointer", marginBottom: 24, padding: 0 }}>← 結果に戻る / Back</button>
              <div style={{ fontSize: 11, color: "#b5a272", letterSpacing: 2, marginBottom: 8 }}>質問 {reviewCard + 1} / QUESTION {reviewCard + 1}</div>
              <p style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.7, margin: "0 0 6px" }}>{r.scenario_jp}</p>
              <p style={{ fontSize: 12.5, color: "#999", lineHeight: 1.5, margin: "0 0 24px" }}>{r.scenario_en}</p>

              <div style={{ padding: "14px 18px", borderRadius: 10, marginBottom: 24, background: j ? "linear-gradient(135deg,#faf6ed,#f5eedf)" : "linear-gradient(135deg,#f0f4fa,#e4ecf5)", border: `1px solid ${j ? "#e8d9b5" : "#c5d5ea"}` }}>
                <div style={{ fontSize: 10, color: "#bbb", letterSpacing: 1, marginBottom: 6 }}>あなたの回答 / YOUR ANSWER</div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>{a?.text}</div>
                <div style={{ fontSize: 11.5, color: "#aaa", marginTop: 3 }}>{a?.text_en}</div>
              </div>

              {/* Cultural comparison with what each gets right AND misses */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                <div style={{ padding: "16px", borderRadius: 10, background: "#faf6ed", border: "1px solid #ede5d0" }}>
                  <div style={{ fontSize: 10, color: "#c4a35a", letterSpacing: 1, marginBottom: 6 }}>🇯🇵 日本の視点</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#8a7030" }}>{r.cultural_jp}</div>
                  <div style={{ fontSize: 11, lineHeight: 1.6, color: "#777", marginBottom: 6 }}>{r.cultural_jp_desc}</div>
                  <div style={{ fontSize: 10, lineHeight: 1.5, color: "#aaa", marginBottom: 8 }}>{r.cultural_jp_desc_en}</div>
                  <div style={{ fontSize: 10, color: "#7a9a4a", marginBottom: 2 }}>✓ {r.cultural_jp_right}</div>
                  <div style={{ fontSize: 9.5, color: "#bbb", marginBottom: 4 }}>{r.cultural_jp_right_en}</div>
                  <div style={{ fontSize: 10, color: "#b07040", marginBottom: 2 }}>△ {r.cultural_jp_miss}</div>
                  <div style={{ fontSize: 9.5, color: "#bbb" }}>{r.cultural_jp_miss_en}</div>
                </div>
                <div style={{ padding: "16px", borderRadius: 10, background: "#f0f4fa", border: "1px solid #d5e0ee" }}>
                  <div style={{ fontSize: 10, color: "#3a5a8b", letterSpacing: 1, marginBottom: 6 }}>🇺🇸 アメリカの視点</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#3a5a8b" }}>{r.cultural_us}</div>
                  <div style={{ fontSize: 11, lineHeight: 1.6, color: "#777", marginBottom: 6 }}>{r.cultural_us_desc}</div>
                  <div style={{ fontSize: 10, lineHeight: 1.5, color: "#aaa", marginBottom: 8 }}>{r.cultural_us_desc_en}</div>
                  <div style={{ fontSize: 10, color: "#7a9a4a", marginBottom: 2 }}>✓ {r.cultural_us_right}</div>
                  <div style={{ fontSize: 9.5, color: "#bbb", marginBottom: 4 }}>{r.cultural_us_right_en}</div>
                  <div style={{ fontSize: 10, color: "#b07040", marginBottom: 2 }}>△ {r.cultural_us_miss}</div>
                  <div style={{ fontSize: 9.5, color: "#bbb" }}>{r.cultural_us_miss_en}</div>
                </div>
              </div>

              {/* Gospel as third lens */}
              <div style={{ padding: "20px", borderRadius: 12, background: "linear-gradient(135deg, #fdfcf8, #f8f4ea)", border: "1px solid #e8dfc8", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 2, background: "linear-gradient(90deg, transparent, #c4a35a, transparent)" }} />
                <div style={{ fontSize: 10, color: "#b5a272", letterSpacing: 2, marginBottom: 12, marginTop: 4 }}>もう一つの視点 / A THIRD PERSPECTIVE</div>
                <p style={{ fontSize: 13, lineHeight: 1.9, color: "#555", margin: "0 0 10px" }}>{r.gospel_jp}</p>
                <p style={{ fontSize: 11.5, lineHeight: 1.7, color: "#aaa", margin: 0 }}>{r.gospel_en}</p>
              </div>
            </div>
          );
        })()}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        button { font-family: inherit; }
      `}</style>
    </div>
  );
}
