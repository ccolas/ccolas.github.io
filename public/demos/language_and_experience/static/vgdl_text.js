export var vgdl_text_dict = {
    "JRNL_relational_v0":
    `
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        avatar > MovingAvatar img=colors/DARKBLUE
        box > Passive img=colors/ORANGE
        converter1 > Passive img=colors/RED
        converter2 > Immovable img=colors/PURPLE
        converter3 > Immovable img=colors/PINK
        fire > Immovable img=colors/YELLOW
        poison > Immovable img=colors/WHITE
        probe > Passive img=colors/BLUE
        wall > Immovable img=colors/DARKGRAY
    LevelMapping
        . > floor
        a > floor  box
        e > floor  converter1
        f > floor  fire
        p > floor  poison
        w > floor  wall
        x > floor  probe
        y > floor  converter2
        z > floor  converter3
        A > floor avatar
    InteractionSet
        avatar fire > stepBack
        avatar poison > killSprite
        avatar wall > stepBack
        box avatar > bounceForward
        box box > stepBack
        box converter2 > transformTo stype=fire
        box fire > stepBack
        box probe > stepBack
        box wall > stepBack
        box poison > stepBack
        probe poison > stepBack
        converter1 poison > stepBack
        converter1 wall > stepBack
        converter2 wall > stepBack
        converter3 wall > stepBack
        converter1 avatar > transformTo stype=fire
        converter1 box > bounceForward
        converter2 fire > killSprite
        converter3 avatar > transformTo stype=box
        fire probe > killSprite scoreChange=1
        probe fire > killSprite 
        probe avatar > bounceForward
        probe box > stepBack
        probe converter1 > stepBack
        probe converter2 > stepBack    
        probe converter3 > stepBack
        probe probe > stepBack
        probe wall > stepBack
        avatar EOS > killSprite
        box EOS > killSprite
        converter1 EOS > killSprite
        converter2 EOS > killSprite
        converter3 EOS > killSprite
        fire EOS > killSprite
        probe EOS > killSprite
        wall EOS > killSprite
    TerminationSet
        SpriteCounter stype=avatar  limit=0 win=False
        SpriteCounter stype=probe limit=0 win=True
        Timeout limit=3000 win=False
    `,
     "JRNL_plaqueAttack_v0":
    `
SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        fullMolarInf > Immovable img=colors/YELLOW
        fullMolarSup > Immovable img=colors/RED
        deadMolarInf > Immovable img=colors/GREEN
        deadMolarSup > Immovable img=colors/BLUE
        avatar  > ShootAvatar stype=fluor img=colors/DARKBLUE
                              frameRate=8 speed=1
        hotdoghole > SpawnPoint stype=hotdog  prob=0.15
                                cooldown=10 total=5 img=colors/PURPLE
        burgerhole > SpawnPoint stype=burger  prob=0.18
                                cooldown=10 total=5 img=colors/LIGHTBLUE
        burger > Chaser speed=1 cooldown=10 stype=fullMolarSup
                        img=colors/BROWN fleeing=False
        hotdog > Chaser speed=1 cooldown=10 stype=fullMolarInf
                        img=colors/ORANGE fleeing=False
        fluor > Missile img=colors/LIGHTRED speed=1
        wall > Immovable img=colors/GRAY
    LevelMapping
        h > hotdog floor
        d > hotdoghole floor
        b > burger floor
        v > burgerhole floor
        n > fullMolarSup floor
        m > fullMolarInf floor
        . > floor
        A > avatar floor
        w > floor wall
        p > floor deadMolarInf
    InteractionSet
        avatar wall > stepBack
        hotdog wall > stepBack
        burger wall > stepBack
        fluor hotdog > killSprite
        hotdog fluor > killSprite scoreChange=1
        fluor burger > killSprite
        burger fluor > killSprite scoreChange=1
        fluor wall   > killSprite
        fullMolarInf hotdog > transformTo stype=deadMolarInf scoreChange=-1
        hotdog deadMolarInf > killSprite 
        fullMolarInf burger > transformTo stype=deadMolarInf scoreChange=-1
        burger deadMolarInf > killSprite 
        deadMolarInf avatar > transformTo stype=fullMolarInf scoreChange=1
        fullMolarSup hotdog > transformTo stype=deadMolarSup
        hotdog deadMolarSup > killSprite  scoreChange=-1
        fullMolarSup burger > transformTo stype=deadMolarSup 
        burger deadMolarSup > killSprite scoreChange=-1
        deadMolarSup avatar > transformTo stype=fullMolarSup scoreChange=1
        avatar EOS > killSprite
        burger EOS > killSprite
        burgerhole EOS > killSprite
        deadMolarInf EOS > killSprite
        deadMolarSup EOS > killSprite
        fluor EOS > killSprite
        fullMolarInf EOS > killSprite
        fullMolarSup EOS > killSprite
        hotdog EOS > killSprite
        hotdoghole EOS > killSprite
        wall EOS > killSprite
    TerminationSet
        Timeout limit=3000 win=False
        MultiSpriteCounter stype1=fullMolarInf stype2=fullMolarSup
                           limit=0 win=False
        MultiSpriteCounter stype1=hotdoghole stype2=hotdog stype3=burger
                           stype4=burgerhole limit=0 win=True
    `,
     "JRNL_missile_command_v0":
     `
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        city  > RandomNPC img=colors/GREEN speed=0.2
        explosion > Flicker limit=5 img=colors/PINK
        avatar  > ShootAvatar stype=explosion img=colors/DARKBLUE
        incoming_slow  > Chaser stype=city img=colors/RED speed=0.1
        incoming_fast  > Chaser stype=city img=colors/GOLD speed=0.3
        wall > Immovable img=colors/DARKGRAY
    LevelMapping
        . > floor
        c > floor city
        m > floor incoming_slow
        f > floor incoming_fast
        w > floor wall
        A > floor avatar
    InteractionSet
        incoming_slow wall  > stepBack
        incoming_fast wall  > stepBack
        avatar wall  > stepBack
        incoming_slow city > killSprite scoreChange=-1
        city incoming_slow > killSprite
        incoming_fast city > killSprite scoreChange=-1
        city incoming_fast > killSprite
        incoming_slow explosion > killSprite scoreChange=1
        incoming_fast explosion > killSprite scoreChange=1
        city wall > stepBack
        avatar EOS > killSprite
        city EOS > killSprite
        explosion EOS > killSprite
        incoming_fast EOS > killSprite
        incoming_slow EOS > killSprite
        wall EOS > killSprite
    TerminationSet
        SpriteCounter stype=city   win=False
        MultiSpriteCounter stype1=incoming_slow
                           stype2=incoming_fast win=True
        Timeout limit=2000 win=False
     `,

     "JRNL_preconditions_v0":
     `
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        avatar > MovingAvatar img=colors/DARKBLUE speed=1
        box > Immovable img=colors/RED
        goal > Immovable img=colors/GOLD
        medicine > ResourcePack limit=4 img=colors/WHITE
        poison > Immovable img=colors/GREEN
        wall > Immovable img=colors/DARKGRAY
    LevelMapping
        . > floor
        b > floor  box
        g > floor  goal
        m > floor  medicine
        p > floor  poison
        w > floor  wall
        A > floor avatar
    InteractionSet
        medicine avatar > addResource resource=medicine
        avatar poison > killIfHasLess resource=medicine limit=0
        poison avatar > removeResource resource=medicine
        avatar wall > stepBack
        box avatar > killSprite
        goal avatar > killSprite scoreChange=1
        avatar EOS > killSprite
        box EOS > killSprite
        goal EOS > killSprite
        medicine EOS > killSprite
        poison EOS > killSprite
        wall EOS > killSprite
    TerminationSet
        SpriteCounter stype=avatar  limit=0 win=False
        SpriteCounter stype=goal limit=0 win=True
        Timeout limit=3000 win=False
     `,

     "JRNL_beesAndBirds_v0":
     `
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        avatar > MovingAvatar img=colors/DARKBLUE
        bee > RandomNPC img=colors/YELLOW cooldown=4
        distractor > Immovable img=colors/RED
        fence > Immovable img=colors/PURPLE
        goal > Immovable img=colors/GREEN
        obstacle > Immovable img=colors/ORANGE
        sparrow1 > Chaser stype=obstacle img=colors/LIGHTGREEN cooldown=4
        wall > Immovable img=colors/DARKGRAY
    LevelMapping
        . > floor
        1 > floor  sparrow1
        b > floor  bee
        d > floor  distractor
        f > floor  fence
        g > floor  goal
        o > floor  obstacle
        A > floor avatar
        w > floor wall
    InteractionSet
        avatar bee > killSprite
        avatar obstacle > killSprite
        avatar wall > stepBack
        bee distractor > stepBack
        bee fence > stepBack
        bee obstacle > stepBack
        bee sparrow1 > killSprite
        bee wall > stepBack
        distractor avatar > killSprite
        fence avatar > killSprite
        goal avatar > killSprite scoreChange=1
        obstacle sparrow1 > killSprite
        sparrow1 fence > stepBack
        sparrow1 wall > stepBack
        bee EOS > stepBack
        sparrow1 EOS > stepBack
        avatar EOS > stepBack
        avatar EOS > killSprite
        bee EOS > killSprite
        distractor EOS > killSprite
        fence EOS > killSprite
        goal EOS > killSprite
        obstacle EOS > killSprite
        sparrow1 EOS > killSprite
        wall EOS > killSprite  
    TerminationSet
        Timeout limit=3000 win=False
        SpriteCounter stype=goal   limit=0 win=True
        SpriteCounter stype=avatar limit=0 win=False
     `,

     "JRNL_portals_v0":
     `
    SpriteSet
    	  floor > Immovable img=colors/LIGHTGRAY
    	  sitting  > Immovable img=colors/DARKGREEN
        vertical   > Missile orientation=UP speed=0.15 img=colors/PINK
        horizontal > Missile orientation=LEFT speed=0.2 img=colors/LIGHTRED
    	  goal  > Immovable img=colors/LIGHTGREEN
        random   > RandomNPC speed=0.1 cons=1 img=colors/BROWN
        entry1 > Portal stype=exit1 img=colors/LIGHTBLUE
        entry2 > Portal stype=exit2 img=colors/BLUE
        exit1  > Immovable img=colors/GOLD
        exit2  > Immovable img=colors/LIGHTORANGE
        wall > Immovable img=colors/DARKGRAY autotiling=True
        avatar > MovingAvatar img=colors/DARKBLUE speed=1   
    LevelMapping
        . > floor
        2 > floor  entry2
        3 > floor  exit2
        g > floor  goal
        h > floor  horizontal
        i > floor  entry1
        o > floor  exit1
        r > floor  random
        v > floor  vertical
        w > floor  wall
        x > floor  sitting
	      A > floor avatar   
    InteractionSet
        random entry1 > stepBack
        random entry2 > stepBack
        random exit1 > stepBack
        random exit2 > stepBack
        random goal > stepBack
        random wall > stepBack
        horizontal goal > stepBack
        vertical goal > stepBack
        sitting  goal > stepBack
        sitting entry1 > stepBack
        sitting entry2 > stepBack
        sitting exit1 > stepBack
        sitting exit2 > stepBack
        sitting wall > stepBack
        avatar entry1 > teleportToExit
        avatar entry2 > teleportToExit
        avatar wall      > stepBack
        goal   avatar    > killSprite scoreChange=1
        avatar sitting    > killSprite
        avatar vertical    > killSprite
        avatar horizontal    > killSprite
        vertical wall    > reverseDirection
        horizontal wall    > reverseDirection
        avatar EOS > killSprite
        entry1 EOS > killSprite
        entry2 EOS > killSprite
        exit1 EOS > killSprite
        exit2 EOS > killSprite
        goal EOS > killSprite
        horizontal EOS > killSprite
        random EOS > killSprite
        sitting EOS > killSprite
        vertical EOS > killSprite
        wall EOS > killSprite
    TerminationSet
        SpriteCounter stype=goal   limit=0 win=True
        SpriteCounter stype=avatar limit=0 win=False
        Timeout limit=3000 win=False
     `,
     "JRNL_aliens_v0":
     `
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        wall > Immovable img=colors/DARKGRAY
        base    > Immovable img=colors/WHITE
        avatar  > FlakAvatar stype=sam img=colors/DARKBLUE
        sam > Missile orientation=UP img=colors/BLUE singleton=True
        bomb > Missile orientation=DOWN img=colors/RED speed=0.5
        alien > Bomber stype=bomb orientation=RIGHT prob=0.03
                       cooldown=3 speed=0.8 img=colors/PINK
        portalSlow > SpawnPoint stype=alien  cooldown=16
                                total=20 img=colors/ORANGE
        portalFast > SpawnPoint stype=alien  cooldown=12
                                total=20 img=colors/BROWN
    LevelMapping
        . > floor
        w > floor wall
        0 > floor base
        1 > floor portalSlow
        2 > floor portalFast
        A > floor avatar
    TerminationSet
        SpriteCounter      stype=avatar limit=0 win=False
        MultiSpriteCounter stype1=portalSlow
                           stype2=alien
                           stype3=portalFast limit=0 win=True
    InteractionSet
        avatar  wall  > stepBack
        alien   wall  > turnAround
        sam wall  > killSprite
        bomb wall  > killSprite
        base bomb > killSprite
        bomb base > killSprite
        sam base > killSprite
        base sam > killSprite
        base   alien > killSprite
        avatar alien > killSprite scoreChange=-1
        avatar bomb  > killSprite scoreChange=-1
        alien  sam   > killSprite scoreChange=1
        alien EOS > killSprite
        avatar EOS > killSprite
        base EOS > killSprite
        bomb EOS > killSprite
        portalFast EOS > killSprite
        portalSlow EOS > killSprite
        sam EOS > killSprite
        wall EOS > killSprite
     `,

     "JRNL_avoidGeorge_v0":
     `
    SpriteSet
	      floor > Immovable img=colors/LIGHTGRAY
        annoyed > RandomNPC speed=0.2 img=colors/PURPLE
        cigarette > Flicker img=colors/BROWN limit=5 singleton=True 
        quiet > RandomNPC speed=0.2 cons=1 img=colors/GREEN
        avatar > ShootAvatar stype=cigarette img=colors/DARKBLUE speed=1
        george > Chaser img=colors/LIGHTBLUE stype=quiet speed=0.15 fleeing=False
        kennel > Immovable img=colors/BLUE
        puppy > Chaser stype=annoyed cooldown=5 img=colors/ORANGE fleeing=False
        wall > Immovable img=colors/DARKGRAY
    LevelMapping
        . > floor
        A > floor   avatar
        c > floor   quiet
        g > floor   george
        k > floor  kennel
        p > floor  puppy
        w > floor  wall
        a > floor annoyed
    InteractionSet
        annoyed cigarette > transformTo stype=quiet scoreChange=1
        annoyed puppy > transformTo stype=quiet scoreChange=1
        annoyed wall > stepBack
        avatar george > killSprite scoreChange=-1
        avatar wall > stepBack
        kennel cigarette > transformTo stype=puppy 
        quiet george > transformTo stype=annoyed
        quiet wall > stepBack
        puppy wall > stepBack
        annoyed EOS > killSprite
        avatar EOS > killSprite
        cigarette EOS > killSprite
        george EOS > killSprite
        kennel EOS > killSprite
        puppy EOS > killSprite
        quiet EOS > killSprite
        wall EOS > killSprite
    TerminationSet
        SpriteCounter stype=avatar  win=False
        SpriteCounter stype=quiet   win=False
        Timeout limit=500 win=True
     `,
     "JRNL_pushBoulders_v0":
     `
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        avatar > MovingAvatar img=colors/DARKBLUE
        box1 > Passive img=colors/GREEN
        box2 > Immovable img=colors/LIGHTBLUE
        goal > Immovable img=colors/GOLD
        poison1 > Immovable img=colors/ORANGE
        poison2 > Passive img=colors/PINK
        wall > Immovable img=colors/DARKGRAY
    LevelMapping
        . > floor
        1 > floor  box1
        2 > floor  box2
        g > floor  goal
        p > floor  poison1
        q > floor  poison2
        w > floor  wall
        A > floor avatar
    InteractionSet
        avatar poison1 > killSprite
        avatar poison2 > killSprite
        avatar wall > stepBack
        box1 avatar > bounceForward
        box1 box1 > stepBack
        box1 wall    > stepBack
        box2 avatar  > killSprite
        box2 box1 > killSprite
        box2 goal > stepBack
        box2 wall    > stepBack
        goal avatar > killSprite scoreChange=1
        goal box1 > killSprite scoreChange=1
        goal poison1 > stepBack
        goal poison2 > stepBack
        goal wall > stepBack
        poison1 wall > stepBack
        poison2 wall > stepBack
        poison1 box1 > killSprite
        poison1 box2 > stepBack
        poison2 box1 > bounceForward
        poison2 box1 > stepBack
        poison2 box2 > stepBack
        poison2 poison2 > stepBack 
        avatar EOS > killSprite
        box1 EOS > killSprite
        box2 EOS > killSprite
        goal EOS > killSprite
        poison1 EOS > killSprite
        poison2 EOS > killSprite
        wall EOS > killSprite
    TerminationSet
        Timeout limit=3000 win=False
        SpriteCounter stype=goal    limit=0 win=True
        SpriteCounter stype=avatar  limit=0 win=False
     `,
     "JRNL_jaws_v0":
     `
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        wall > Immovable img=colors/DARKGRAY
        whalehole  > SpawnPoint img=colors/PURPLE stype=whale
                                prob=0.1 cooldown=10
        piranhahole  >  SpawnPoint img=colors/GREEN stype=piranha
                                   prob=0.15 cooldown=10
        avatar  > MovingAvatar img=colors/DARKBLUE
        shark  > Chaser speed=0.1 cooldown=2 img=colors/ORANGE  stype=avatar
        whale  > Missile  orientation=RIGHT  speed=0.1 img=colors/BROWN 
        piranha > Missile orientation=LEFT speed=0.1 img=colors/PINK
    LevelMapping
        . > floor
        w > wall
        1 > floor piranhahole
        2 > floor whalehole
        3 > floor shark
        A > floor avatar
    TerminationSet
        SpriteCounter stype=avatar limit=0 win=False
        Timeout limit=500 win=True
    InteractionSet
        avatar shark  > killSprite
        avatar whale  > killSprite
        avatar piranha > killSprite
        avatar wall > stepBack
        shark wall > stepBack
        whale wall > killSprite
        piranha wall > killSprite
        avatar EOS > killSprite
        piranha EOS > killSprite
        piranhahole EOS > killSprite
        shark EOS > killSprite
        wall EOS > killSprite
        whale EOS > killSprite
        whalehole EOS > killSprite
     `
  }