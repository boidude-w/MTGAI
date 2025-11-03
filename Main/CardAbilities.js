// Card Abilities System - Handles keyword abilities and triggered effects

class CardAbilities {
    constructor() {
        this.abilities = this.initializeAbilities();
    }

    // Initialize all keyword abilities and their effects
    initializeAbilities() {
        return {
            // Combat abilities
            'Flying': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasFlying = true;
                    return 'Can only be blocked by creatures with flying or reach';
                }
            },
            'Trample': {
                type: 'combat',
                effect: (attacker, blocker, gameState) => {
                    const excessDamage = (attacker.power || 0) - (blocker ? blocker.toughness || 0 : 0);
                    if (excessDamage > 0) {
                        const defender = gameState.currentPlayer === 'player' ? 'ai' : 'player';
                        gameState[defender].life -= excessDamage;
                        return `${attacker.name} tramples for ${excessDamage} damage!`;
                    }
                    return null;
                }
            },
            'Haste': {
                type: 'static',
                effect: (card, gameState) => {
                    card.sickness = false;
                    return 'Can attack immediately';
                }
            },
            'First Strike': {
                type: 'combat',
                effect: (card, gameState) => {
                    card.hasFirstStrike = true;
                    return 'Deals combat damage before creatures without first strike';
                }
            },
            'Double Strike': {
                type: 'combat',
                effect: (card, gameState) => {
                    card.hasFirstStrike = true;
                    card.hasDoubleStrike = true;
                    return 'Deals both first-strike and regular combat damage';
                }
            },
            'Deathtouch': {
                type: 'combat',
                effect: (card, target) => {
                    if (target && target.toughness) {
                        return { destroy: true, reason: 'deathtouch' };
                    }
                    return null;
                }
            },
            'Lifelink': {
                type: 'combat',
                effect: (card, damage, owner, gameState) => {
                    gameState[owner].life += damage;
                    return `${owner === 'player' ? 'You' : 'AI'} gained ${damage} life from lifelink`;
                }
            },
            'Vigilance': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasVigilance = true;
                    return "Doesn't tap when attacking";
                }
            },
            'Hexproof': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasHexproof = true;
                    return "Can't be targeted by opponent's spells or abilities";
                }
            },
            'Shroud': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasShroud = true;
                    return "Can't be targeted by spells or abilities";
                }
            },
            'Indestructible': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasIndestructible = true;
                    return "Can't be destroyed";
                }
            },
            'Menace': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasMenace = true;
                    return 'Must be blocked by two or more creatures';
                }
            },
            'Reach': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasReach = true;
                    return 'Can block creatures with flying';
                }
            },
            'Defender': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasDefender = true;
                    return "Can't attack";
                }
            },
            'Flash': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasFlash = true;
                    return 'Can be cast at instant speed';
                }
            },
            // Additional combat abilities
            'Fear': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasFear = true;
                    return 'Can only be blocked by black or artifact creatures';
                }
            },
            'Intimidate': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasIntimidate = true;
                    return 'Can only be blocked by artifact creatures or creatures that share a color';
                }
            },
            'Shadow': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasShadow = true;
                    return 'Can only block or be blocked by creatures with shadow';
                }
            },
            'Horsemanship': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasHorsemanship = true;
                    return 'Can only be blocked by creatures with horsemanship';
                }
            },
            'Landwalk': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasLandwalk = true;
                    return 'Unblockable if opponent controls specified land type';
                }
            },
            'Protection': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasProtection = true;
                    return "Can't be blocked, targeted, dealt damage, or enchanted by specified quality";
                }
            },
            'Banding': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasBanding = true;
                    return 'Can attack in a band with other creatures';
                }
            },
            // Evasion abilities
            'Unblockable': {
                type: 'static',
                effect: (card, gameState) => {
                    card.isUnblockable = true;
                    return "Can't be blocked";
                }
            },
            'Skulk': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasSkulk = true;
                    return "Can't be blocked by creatures with greater power";
                }
            },
            // Resource abilities
            'Convoke': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasConvoke = true;
                    return 'Can tap creatures to help pay mana cost';
                }
            },
            'Delve': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasDelve = true;
                    return 'Can exile cards from graveyard to reduce mana cost';
                }
            },
            'Improvise': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasImprovise = true;
                    return 'Can tap artifacts to help pay mana cost';
                }
            },
            'Affinity': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasAffinity = true;
                    return 'Costs less for each specified permanent you control';
                }
            },
            // Graveyard abilities
            'Flashback': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasFlashback = true;
                    return 'Can be cast from graveyard';
                }
            },
            'Unearth': {
                type: 'activated',
                effect: (card, gameState) => {
                    card.hasUnearth = true;
                    return 'Return from graveyard until end of turn';
                }
            },
            'Persist': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasPersist = true;
                    return 'Returns to battlefield with -1/-1 counter when it dies';
                }
            },
            'Undying': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasUndying = true;
                    return 'Returns to battlefield with +1/+1 counter when it dies';
                }
            },
            'Dredge': {
                type: 'replacement',
                effect: (card, gameState) => {
                    card.hasDredge = true;
                    return 'Return from graveyard by milling cards';
                }
            },
            'Escape': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasEscape = true;
                    return 'Can be cast from graveyard by exiling other cards';
                }
            },
            // Token/Counter abilities
            'Proliferate': {
                type: 'triggered',
                effect: (card, owner, gameState) => {
                    return 'Add an additional counter to each permanent with a counter';
                }
            },
            'Modular': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasModular = true;
                    return 'Enters with +1/+1 counters, moves them when it dies';
                }
            },
            'Graft': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasGraft = true;
                    return 'Moves +1/+1 counters to other creatures';
                }
            },
            'Fabricate': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasFabricate = true;
                    return 'Choose +1/+1 counters or create tokens';
                }
            },
            'Adapt': {
                type: 'activated',
                effect: (card, gameState) => {
                    card.hasAdapt = true;
                    return 'Put +1/+1 counters if it has none';
                }
            },
            'Evolve': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasEvolve = true;
                    return 'Gets +1/+1 counter when larger creature enters';
                }
            },
            // Card advantage abilities
            'Cascade': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasCascade = true;
                    return 'Exile cards until you find a cheaper spell to cast';
                }
            },
            'Cycling': {
                type: 'activated',
                effect: (card, gameState) => {
                    card.hasCycling = true;
                    return 'Discard to draw a card';
                }
            },
            'Scry': {
                type: 'triggered',
                effect: (card, gameState) => {
                    return 'Look at top cards and arrange them';
                }
            },
            'Surveil': {
                type: 'triggered',
                effect: (card, gameState) => {
                    return 'Look at top cards, put some in graveyard';
                }
            },
            'Explore': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasExplore = true;
                    return 'Reveal top card, may put land in hand';
                }
            },
            'Mentor': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasMentor = true;
                    return 'Puts +1/+1 counter on smaller attacking creature';
                }
            },
            // Damage abilities
            'Infect': {
                type: 'combat',
                effect: (card, gameState) => {
                    card.hasInfect = true;
                    return 'Deals damage as -1/-1 counters to creatures and poison to players';
                }
            },
            'Wither': {
                type: 'combat',
                effect: (card, gameState) => {
                    card.hasWither = true;
                    return 'Deals damage as -1/-1 counters to creatures';
                }
            },
            'Poisonous': {
                type: 'combat',
                effect: (card, gameState) => {
                    card.hasPoisonous = true;
                    return 'Gives poison counters when dealing combat damage';
                }
            },
            // ETB/LTB abilities
            'Echo': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasEcho = true;
                    return 'Pay cost again or sacrifice';
                }
            },
            'Vanishing': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasVanishing = true;
                    return 'Enters with time counters, sacrificed when removed';
                }
            },
            'Fading': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasFading = true;
                    return 'Enters with fade counters, sacrificed when removed';
                }
            },
            // Control abilities
            'Annihilator': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasAnnihilator = true;
                    return 'Opponent sacrifices permanents when attacking';
                }
            },
            'Intimidate': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasIntimidate = true;
                    return 'Can only be blocked by artifact or matching color creatures';
                }
            },
            'Ward': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasWard = true;
                    return 'Opponent must pay cost to target this';
                }
            },
            // Multiplayer abilities
            'Partner': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasPartner = true;
                    return 'Can have two commanders';
                }
            },
            'Companion': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasCompanion = true;
                    return 'Can be your companion if deck meets requirement';
                }
            },
            // Miscellaneous
            'Equip': {
                type: 'activated',
                effect: (card, gameState) => {
                    card.hasEquip = true;
                    return 'Attach to target creature you control';
                }
            },
            'Fortify': {
                type: 'activated',
                effect: (card, gameState) => {
                    card.hasFortify = true;
                    return 'Attach to target land you control';
                }
            },
            'Bestow': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasBestow = true;
                    return 'Cast as Aura or creature';
                }
            },
            'Morph': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasMorph = true;
                    return 'Can be cast face-down as 2/2 creature';
                }
            },
            'Megamorph': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasMegamorph = true;
                    return 'Morph that gives +1/+1 counter when turned face-up';
                }
            },
            'Split Second': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasSplitSecond = true;
                    return "Can't be responded to with spells or abilities";
                }
            },
            'Storm': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasStorm = true;
                    return 'Copy for each spell cast this turn';
                }
            },
            'Suspend': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasSuspend = true;
                    return 'Exile with time counters, cast when removed';
                }
            },
            'Buyback': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasBuyback = true;
                    return 'Return to hand instead of graveyard if cost paid';
                }
            },
            'Kicker': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasKicker = true;
                    return 'Additional effect if extra cost paid';
                }
            },
            'Entwine': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasEntwine = true;
                    return 'Choose both modes if cost paid';
                }
            },
            'Replicate': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasReplicate = true;
                    return 'Copy spell for each time cost paid';
                }
            },
            'Madness': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasMadness = true;
                    return 'Cast when discarded for alternate cost';
                }
            },
            'Embalm': {
                type: 'activated',
                effect: (card, gameState) => {
                    card.hasEmbalm = true;
                    return 'Create token copy from graveyard';
                }
            },
            'Eternalize': {
                type: 'activated',
                effect: (card, gameState) => {
                    card.hasEternalize = true;
                    return 'Create 4/4 token copy from graveyard';
                }
            },
            'Riot': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasRiot = true;
                    return 'Choose haste or +1/+1 counter';
                }
            },
            'Spectacle': {
                type: 'static',
                effect: (card, gameState) => {
                    card.hasSpectacle = true;
                    return 'Costs less if opponent lost life';
                }
            },
            'Afterlife': {
                type: 'triggered',
                effect: (card, gameState) => {
                    card.hasAfterlife = true;
                    return 'Create spirit tokens when it dies';
                }
            }
        };
    }

    // Parse card text for abilities
    parseCardAbilities(card) {
        if (!card.text) return [];
        
        const abilities = [];
        const text = card.text.toLowerCase();
        
        // Check for keyword abilities
        Object.keys(this.abilities).forEach(keyword => {
            if (text.includes(keyword.toLowerCase())) {
                abilities.push({
                    name: keyword,
                    data: this.abilities[keyword]
                });
            }
        });

        // Check for ETB triggers - ENHANCED
        if (text.includes('when') && (text.includes('enters') || text.includes('enter the battlefield'))) {
            abilities.push({
                name: 'ETB',
                trigger: 'enters_battlefield',
                effect: this.parseETBEffect(card.text)
            });
        }

        // Check for "As ~ enters" replacement effects
        if (text.includes('as') && text.includes('enters')) {
            abilities.push({
                name: 'ETB Replacement',
                trigger: 'enters_battlefield_replacement',
                effect: this.parseETBReplacementEffect(card.text)
            });
        }

        // Check for attack triggers
        if (text.includes('whenever') && text.includes('attacks')) {
            abilities.push({
                name: 'Attack Trigger',
                trigger: 'attacks',
                effect: this.parseAttackTrigger(card.text)
            });
        }

        // Check for death triggers
        if (text.includes('when') && (text.includes('dies') || text.includes('put into a graveyard'))) {
            abilities.push({
                name: 'Death Trigger',
                trigger: 'dies',
                effect: this.parseDiesTrigger(card.text)
            });
        }

        // Check for cast triggers
        if (text.includes('when you cast')) {
            abilities.push({
                name: 'Cast Trigger',
                trigger: 'cast',
                effect: this.parseCastTrigger(card.text)
            });
        }

        // Check for activated abilities
        if (text.includes('tap') && text.includes(':')) {
            abilities.push({
                name: 'Activated Ability',
                trigger: 'activated',
                effect: this.parseActivatedAbility(card.text)
            });
        }

        return abilities;
    }

    // Parse ETB (Enters the Battlefield) effects - ENHANCED
    parseETBEffect(text) {
        const lowerText = text.toLowerCase();
        
        // Draw cards
        if (lowerText.includes('draw')) {
            const match = text.match(/draw (\d+)/i);
            const cards = match ? parseInt(match[1]) : 1;
            return {
                type: 'draw',
                amount: cards,
                description: `Draw ${cards} card${cards > 1 ? 's' : ''}`
            };
        }
        
        // Gain life
        if (lowerText.includes('gain') && lowerText.includes('life')) {
            const match = text.match(/gain (\d+) life/i);
            const life = match ? parseInt(match[1]) : 1;
            return {
                type: 'gainLife',
                amount: life,
                description: `Gain ${life} life`
            };
        }
        
        // Deal damage
        if (lowerText.includes('deal') && lowerText.includes('damage')) {
            const match = text.match(/deal (\d+) damage/i);
            const damage = match ? parseInt(match[1]) : 1;
            const target = lowerText.includes('each opponent') ? 'each_opponent' :
                          lowerText.includes('any target') ? 'any_target' :
                          lowerText.includes('target creature') ? 'target_creature' :
                          lowerText.includes('target player') ? 'target_player' : 'any_target';
            return {
                type: 'damage',
                amount: damage,
                target: target,
                description: `Deal ${damage} damage to ${target.replace('_', ' ')}`
            };
        }
        
        // Destroy permanent
        if (lowerText.includes('destroy')) {
            const target = lowerText.includes('target creature') ? 'creature' :
                         lowerText.includes('target artifact') ? 'artifact' :
                         lowerText.includes('target enchantment') ? 'enchantment' :
                         lowerText.includes('target planeswalker') ? 'planeswalker' : 'permanent';
            return {
                type: 'destroy',
                target: target,
                description: `Destroy target ${target}`
            };
        }

        // Exile permanent
        if (lowerText.includes('exile')) {
            const target = lowerText.includes('target creature') ? 'creature' :
                         lowerText.includes('target artifact') ? 'artifact' :
                         lowerText.includes('all creatures') ? 'all_creatures' : 'permanent';
            return {
                type: 'exile',
                target: target,
                description: `Exile ${target.replace('_', ' ')}`
            };
        }

        // Create tokens
        if (lowerText.includes('create') && lowerText.includes('token')) {
            const match = text.match(/create (\d+)/i);
            const count = match ? parseInt(match[1]) : 1;
            const tokenType = lowerText.includes('treasure') ? 'Treasure' :
                            lowerText.includes('food') ? 'Food' :
                            lowerText.includes('clue') ? 'Clue' :
                            lowerText.includes('soldier') ? 'Soldier' :
                            lowerText.includes('goblin') ? 'Goblin' :
                            lowerText.includes('elf') ? 'Elf' : 'Token';
            return {
                type: 'createToken',
                count: count,
                tokenType: tokenType,
                description: `Create ${count} ${tokenType} token${count > 1 ? 's' : ''}`
            };
        }

        // Return from graveyard
        if (lowerText.includes('return') && lowerText.includes('graveyard')) {
            return {
                type: 'returnFromGraveyard',
                target: lowerText.includes('target creature') ? 'creature' : 'card',
                description: 'Return card from graveyard'
            };
        }

        // Search library
        if (lowerText.includes('search your library')) {
            const cardType = lowerText.includes('creature') ? 'creature' :
                           lowerText.includes('land') ? 'land' :
                           lowerText.includes('instant or sorcery') ? 'instant_or_sorcery' : 'card';
            return {
                type: 'search',
                cardType: cardType,
                description: `Search library for ${cardType.replace('_', ' ')}`
            };
        }

        // Put counters
        if (lowerText.includes('put') && lowerText.includes('counter')) {
            const match = text.match(/put (\d+)/i);
            const count = match ? parseInt(match[1]) : 1;
            const counterType = lowerText.includes('+1/+1') ? '+1/+1' :
                              lowerText.includes('-1/-1') ? '-1/-1' :
                              lowerText.includes('charge') ? 'charge' : 'counter';
            return {
                type: 'putCounters',
                count: count,
                counterType: counterType,
                description: `Put ${count} ${counterType} counter${count > 1 ? 's' : ''}`
            };
        }

        // Scry
        if (lowerText.includes('scry')) {
            const match = text.match(/scry (\d+)/i);
            const amount = match ? parseInt(match[1]) : 1;
            return {
                type: 'scry',
                amount: amount,
                description: `Scry ${amount}`
            };
        }

        // Mill
        if (lowerText.includes('mill') || (lowerText.includes('put') && lowerText.includes('top') && lowerText.includes('graveyard'))) {
            const match = text.match(/mill (\d+)|top (\d+)/i);
            const amount = match ? parseInt(match[1] || match[2]) : 1;
            return {
                type: 'mill',
                amount: amount,
                target: lowerText.includes('target player') ? 'target_player' : 'you',
                description: `Mill ${amount} cards`
            };
        }

        // Discard
        if (lowerText.includes('discard')) {
            const match = text.match(/discard (\d+)|discard (a|their hand)/i);
            const amount = match && match[1] ? parseInt(match[1]) : 
                         match && match[2] === 'their hand' ? 'all' : 1;
            return {
                type: 'discard',
                amount: amount,
                target: lowerText.includes('target player') || lowerText.includes('opponent') ? 'opponent' : 'you',
                description: `${amount === 'all' ? 'Discard hand' : `Discard ${amount} card${amount > 1 ? 's' : ''}`}`
            };
        }

        // Bounce (return to hand)
        if (lowerText.includes('return') && lowerText.includes('to') && (lowerText.includes('hand') || lowerText.includes('owner'))) {
            const target = lowerText.includes('all') ? 'all' :
                         lowerText.includes('target creature') ? 'creature' :
                         lowerText.includes('target permanent') ? 'permanent' : 'target';
            return {
                type: 'bounce',
                target: target,
                description: `Return ${target} to hand`
            };
        }

        // Tap/Untap
        if (lowerText.includes('tap') || lowerText.includes('untap')) {
            const action = lowerText.includes('untap') ? 'untap' : 'tap';
            const target = lowerText.includes('all') ? 'all' :
                         lowerText.includes('target creature') ? 'target_creature' : 'target';
            return {
                type: action,
                target: target,
                description: `${action.charAt(0).toUpperCase() + action.slice(1)} ${target.replace('_', ' ')}`
            };
        }

        return { 
            type: 'custom', 
            text: text,
            description: 'Special ability'
        };
    }

    // NEW: Parse "As ~ enters" replacement effects
    parseETBReplacementEffect(text) {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('choose a color')) {
            return {
                type: 'chooseColor',
                description: 'Choose a color'
            };
        }

        if (lowerText.includes('choose a creature type')) {
            return {
                type: 'chooseCreatureType',
                description: 'Choose a creature type'
            };
        }

        if (lowerText.includes('with') && lowerText.includes('counter')) {
            const match = text.match(/with (\d+)/i);
            const count = match ? parseInt(match[1]) : 1;
            return {
                type: 'entersWithCounters',
                count: count,
                description: `Enters with ${count} counter(s)`
            };
        }

        return {
            type: 'custom',
            text: text,
            description: 'Enters with special condition'
        };
    }

    // NEW: Parse death triggers
    parseDiesTrigger(text) {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('draw')) {
            return {
                type: 'draw',
                amount: 1,
                description: 'Draw a card'
            };
        }

        if (lowerText.includes('create') && lowerText.includes('token')) {
            const match = text.match(/create (\d+)/i);
            const count = match ? parseInt(match[1]) : 1;
            return {
                type: 'createToken',
                count: count,
                description: `Create ${count} token(s)`
            };
        }

        if (lowerText.includes('return') && lowerText.includes('battlefield')) {
            return {
                type: 'return',
                description: 'Return to battlefield'
            };
        }

        if (lowerText.includes('lose') && lowerText.includes('life')) {
            const match = text.match(/lose (\d+) life/i);
            const amount = match ? parseInt(match[1]) : 1;
            return {
                type: 'loseLife',
                amount: amount,
                description: `Opponent loses ${amount} life`
            };
        }

        return {
            type: 'custom',
            text: text,
            description: 'Dies trigger'
        };
    }

    // NEW: Parse cast triggers
    parseCastTrigger(text) {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('copy')) {
            return {
                type: 'copy',
                description: 'Copy this spell'
            };
        }

        if (lowerText.includes('draw')) {
            return {
                type: 'draw',
                amount: 1,
                description: 'Draw a card'
            };
        }

        return {
            type: 'custom',
            text: text,
            description: 'Cast trigger'
        };
    }

    // Parse attack trigger effects
    parseAttackTrigger(text) {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('gets +')) {
            const match = text.match(/gets \+(\d+)\/\+(\d+)/i);
            if (match) {
                return {
                    type: 'buff',
                    power: parseInt(match[1]),
                    toughness: parseInt(match[2])
                };
            }
        }
        
        if (lowerText.includes('create') && lowerText.includes('token')) {
            return {
                type: 'createToken'
            };
        }

        return { type: 'custom', text: text };
    }

    // Parse activated abilities
    parseActivatedAbility(text) {
        const lowerText = text.toLowerCase();
        
        // Check for mana costs
        const manaCost = this.parseManaCost(text);
        
        if (lowerText.includes('draw')) {
            return {
                type: 'draw',
                cost: manaCost,
                amount: 1
            };
        }
        
        if (lowerText.includes('damage')) {
            const match = text.match(/(\d+) damage/i);
            return {
                type: 'damage',
                cost: manaCost,
                amount: match ? parseInt(match[1]) : 1
            };
        }

        return { type: 'custom', cost: manaCost, text: text };
    }

    // Parse mana cost from text
    parseManaCost(text) {
        const match = text.match(/\{(\d+)\}/);
        return match ? parseInt(match[1]) : 0;
    }

    // Apply static abilities when card enters battlefield
    applyStaticAbilities(card, gameState) {
        const abilities = this.parseCardAbilities(card);
        const messages = [];

        abilities.forEach(ability => {
            if (ability.data && ability.data.type === 'static') {
                const message = ability.data.effect(card, gameState);
                if (message) messages.push(message);
            }
        });

        return messages;
    }

    // Trigger ETB effects - ENHANCED
    triggerETBEffect(card, owner, gameState) {
        const abilities = this.parseCardAbilities(card);
        const messages = [];

        abilities.forEach(ability => {
            if (ability.trigger === 'enters_battlefield') {
                const message = this.resolveEffect(ability.effect, card, owner, gameState);
                if (message) messages.push(message);
            }
            
            if (ability.trigger === 'enters_battlefield_replacement') {
                const message = this.resolveReplacementEffect(ability.effect, card, owner, gameState);
                if (message) messages.push(message);
            }
        });

        return messages;
    }

    // NEW: Trigger death effects
    triggerDeathEffect(card, owner, gameState) {
        const abilities = this.parseCardAbilities(card);
        const messages = [];

        abilities.forEach(ability => {
            if (ability.trigger === 'dies') {
                const message = this.resolveEffect(ability.effect, card, owner, gameState);
                if (message) messages.push(message);
            }
        });

        return messages;
    }

    // NEW: Trigger cast effects
    triggerCastEffect(card, owner, gameState) {
        const abilities = this.parseCardAbilities(card);
        const messages = [];

        abilities.forEach(ability => {
            if (ability.trigger === 'cast') {
                const message = this.resolveEffect(ability.effect, card, owner, gameState);
                if (message) messages.push(message);
            }
        });

        return messages;
    }

    // Resolve an ability effect - ENHANCED
    resolveEffect(effect, card, owner, gameState) {
        if (!effect || !effect.type) return null;

        switch (effect.type) {
            case 'draw':
                for (let i = 0; i < effect.amount; i++) {
                    if (window.drawCardFromLibrary) {
                        window.drawCardFromLibrary(owner);
                    }
                }
                return `${owner === 'player' ? 'You' : 'AI'} drew ${effect.amount} card(s)`;

            case 'gainLife':
                gameState[owner].life += effect.amount;
                return `${owner === 'player' ? 'You' : 'AI'} gained ${effect.amount} life`;

            case 'damage':
                const opponent = owner === 'player' ? 'ai' : 'player';
                gameState[opponent].life -= effect.amount;
                return `${card.name} dealt ${effect.amount} damage`;

            case 'destroy':
                return `${card.name} can destroy target ${effect.target}`;

            case 'exile':
                return `${card.name} can exile ${effect.target}`;

            case 'buff':
                card.power = (card.power || 0) + effect.power;
                card.toughness = (card.toughness || 0) + effect.toughness;
                return `${card.name} gets +${effect.power}/+${effect.toughness}`;

            case 'createToken':
                return `${card.name} creates ${effect.count} ${effect.tokenType} token(s)`;

            case 'returnFromGraveyard':
                return `${card.name} can return ${effect.target} from graveyard`;

            case 'search':
                return `${card.name} searches library for ${effect.cardType}`;

            case 'putCounters':
                card.counters = card.counters || {};
                card.counters[effect.counterType] = (card.counters[effect.counterType] || 0) + effect.count;
                return `Put ${effect.count} ${effect.counterType} counter(s) on ${card.name}`;

            case 'scry':
                return `Scry ${effect.amount}`;

            case 'mill':
                return `Mill ${effect.amount} cards`;

            case 'discard':
                if (effect.target === 'opponent') {
                    const opp = owner === 'player' ? 'ai' : 'player';
                    const toDiscard = effect.amount === 'all' ? gameState[opp].hand.length : 
                                    Math.min(effect.amount, gameState[opp].hand.length);
                    gameState[opp].hand.splice(0, toDiscard);
                    return `${opp === 'player' ? 'You' : 'AI'} discarded ${toDiscard} card(s)`;
                }
                return `Discard ${effect.amount} card(s)`;

            case 'bounce':
                return `Return ${effect.target} to hand`;

            case 'tap':
            case 'untap':
                return `${effect.type.charAt(0).toUpperCase() + effect.type.slice(1)} ${effect.target}`;

            case 'loseLife':
                const opp = owner === 'player' ? 'ai' : 'player';
                gameState[opp].life -= effect.amount;
                return `${opp === 'player' ? 'You' : 'AI'} lost ${effect.amount} life`;

            case 'copy':
                return `${card.name} is copied`;

            default:
                return effect.description || `${card.name} has a special ability`;
        }
    }

    // NEW: Resolve replacement effects
    resolveReplacementEffect(effect, card, owner, gameState) {
        switch (effect.type) {
            case 'entersWithCounters':
                card.counters = card.counters || {};
                card.counters['+1/+1'] = effect.count;
                if (card.power !== undefined) {
                    card.power += effect.count;
                    card.toughness += effect.count;
                }
                return `${card.name} enters with ${effect.count} +1/+1 counter(s)`;

            case 'chooseColor':
                return `Choose a color for ${card.name}`;

            case 'chooseCreatureType':
                return `Choose a creature type for ${card.name}`;

            default:
                return effect.description || 'Replacement effect applied';
        }
    }

    // Activate an ability (for player or AI)
    activateAbility(card, abilityIndex, owner, gameState) {
        const abilities = this.parseCardAbilities(card);
        
        if (abilityIndex < 0 || abilityIndex >= abilities.length) {
            return { success: false, message: 'Invalid ability' };
        }

        const ability = abilities[abilityIndex];

        // Check if it's an activated ability
        if (ability.trigger === 'activated') {
            const cost = ability.effect.cost || 0;
            const availableMana = window.calculateAvailableMana ? 
                window.calculateAvailableMana(owner) : gameState[owner].mana;

            if (cost > availableMana) {
                return { 
                    success: false, 
                    message: `Not enough mana! Need ${cost}, have ${availableMana}` 
                };
            }

            // Check if card is tapped
            if (ability.effect.text && ability.effect.text.toLowerCase().includes('tap:')) {
                if (card.tapped) {
                    return { success: false, message: 'Card is already tapped' };
                }
                card.tapped = true;
            }

            // Pay mana cost by auto-tapping lands
            if (cost > 0 && window.autoTapLands) {
                if (!window.autoTapLands(owner, cost)) {
                    return { success: false, message: 'Failed to pay mana cost' };
                }
            }

            // Resolve the effect
            const message = this.resolveEffect(ability.effect, card, owner, gameState);
            
            if (window.updateUI) window.updateUI();
            
            return { 
                success: true, 
                message: message || `${card.name} activated ability` 
            };
        }

        return { success: false, message: 'Not an activated ability' };
    }

    // Handle combat damage with abilities
    resolveCombatDamage(attacker, blocker, attackerOwner, gameState) {
        const messages = [];
        const attackerAbilities = this.parseCardAbilities(attacker);
        const blockerAbilities = blocker ? this.parseCardAbilities(blocker) : [];

        // Check for first strike
        const attackerHasFirstStrike = attackerAbilities.some(a => 
            a.name === 'First Strike' || a.name === 'Double Strike'
        );
        const blockerHasFirstStrike = blocker ? blockerAbilities.some(a => 
            a.name === 'First Strike' || a.name === 'Double Strike'
        ) : false;

        // First strike damage
        if (attackerHasFirstStrike && !blockerHasFirstStrike && blocker) {
            blocker.toughness -= attacker.power || 0;
            messages.push(`${attacker.name} deals first strike damage`);
            
            if (blocker.toughness <= 0) {
                messages.push(`${blocker.name} is destroyed by first strike`);
                return messages; // Blocker dies before dealing damage
            }
        }

        // Regular combat damage
        const attackerDamage = attacker.power || 0;
        const defenderOwner = attackerOwner === 'player' ? 'ai' : 'player';

        if (blocker) {
            // Damage to blocker
            blocker.toughness -= attackerDamage;
            attacker.toughness -= blocker.power || 0;

            // Check for deathtouch
            const hasDeathtouch = attackerAbilities.some(a => a.name === 'Deathtouch');
            if (hasDeathtouch && attackerDamage > 0) {
                blocker.toughness = 0;
                messages.push(`${attacker.name}'s deathtouch destroys ${blocker.name}`);
            }

            // Check for lifelink
            const hasLifelink = attackerAbilities.some(a => a.name === 'Lifelink');
            if (hasLifelink) {
                gameState[attackerOwner].life += attackerDamage;
                messages.push(`${attackerOwner === 'player' ? 'You' : 'AI'} gained ${attackerDamage} life from lifelink`);
            }

            // Check for trample
            const hasTrample = attackerAbilities.some(a => a.name === 'Trample');
            if (hasTrample && blocker.toughness <= 0) {
                const excessDamage = attackerDamage - (blocker.toughness + (blocker.power || 0));
                if (excessDamage > 0) {
                    gameState[defenderOwner].life -= excessDamage;
                    messages.push(`${attacker.name} tramples for ${excessDamage} damage`);
                }
            }
        } else {
            // Unblocked damage to player
            gameState[defenderOwner].life -= attackerDamage;
            
            const hasLifelink = attackerAbilities.some(a => a.name === 'Lifelink');
            if (hasLifelink) {
                gameState[attackerOwner].life += attackerDamage;
                messages.push(`${attackerOwner === 'player' ? 'You' : 'AI'} gained ${attackerDamage} life from lifelink`);
            }
        }

        // Check for double strike
        const hasDoubleStrike = attackerAbilities.some(a => a.name === 'Double Strike');
        if (hasDoubleStrike && blocker && blocker.toughness > 0) {
            blocker.toughness -= attackerDamage;
            messages.push(`${attacker.name} deals double strike damage`);
        }

        return messages;
    }

    // Check if a creature can attack
    canAttack(card, owner, gameState) {
        const abilities = this.parseCardAbilities(card);
        
        // Check for defender
        if (abilities.some(a => a.name === 'Defender')) {
            return { canAttack: false, reason: 'Has defender' };
        }

        // Check for summoning sickness (unless has haste)
        if (card.sickness && !abilities.some(a => a.name === 'Haste')) {
            return { canAttack: false, reason: 'Summoning sickness' };
        }

        // Check if tapped
        if (card.tapped) {
            return { canAttack: false, reason: 'Already tapped' };
        }

        return { canAttack: true };
    }

    // Get all abilities of a card (for UI display)
    getCardAbilities(card) {
        return this.parseCardAbilities(card);
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CardAbilities;
}