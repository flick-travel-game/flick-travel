#!/usr/bin/env python3
"""からだの図(front / head)の 📍の 場所を、ChatGPT の 絵に 合わせて 書きかえる(けいくん 2026-09-26)。
絵は karada/body-front.webp・karada/body-cell.webp(左=動物の細胞 / 右=植物の細胞 / 下=DNA)(正面。向かって左半分が 骨、右半分が 筋肉)と karada/body-head.webp(横から。顔は 左むき)。
数字は 絵の はば・高さに対する わりあい(0〜1)。絵を 差しかえたら ここを 測りなおして 走らせる → add_spots.py → build_games.py
"""
from pathlib import Path
P = {
# ── 正面(骨は 向かって左 = 本人の右 / 筋肉は 向かって右 = 本人の左) ──
"bonskull":(0.45,0.045),"bonjaw":(0.475,0.118),"boncervical":(0.49,0.14),"bonclavicle":(0.40,0.186),"bonscapula":(0.37,0.21),
"bonsternum":(0.497,0.235),"bonribs":(0.385,0.26),"bonspine":(0.50,0.372),"bonlumbar":(0.505,0.385),"bonpelvis":(0.395,0.465),
"bonsacrum":(0.485,0.50),"boncoccyx":(0.505,0.515),"bonhumerus":(0.315,0.28),"bonradius":(0.255,0.42),"bonulna":(0.285,0.43),
"boncarpal":(0.21,0.50),"bonmetacarpal":(0.19,0.525),"bonphalanx":(0.17,0.565),"bonfemur":(0.415,0.585),"bonpatella":(0.425,0.685),
"bontibia":(0.43,0.79),"bonfibula":(0.398,0.79),"bontarsal":(0.415,0.915),"bonmetatarsal":(0.405,0.94),"boncalcaneus":(0.43,0.93),
"bonbone":(0.41,0.62),"bonjoint":(0.435,0.705),"boncartilage":(0.41,0.70),"bonligament":(0.445,0.69),"bonmarrow":(0.42,0.555),
"bonperiosteum":(0.425,0.75),"bonshoulder":(0.34,0.197),"bonelbow":(0.29,0.36),"bonwrist":(0.215,0.488),"bonhip":(0.41,0.49),
"bonankle":(0.42,0.895),"bondisc":(0.505,0.395),"bonskeleton":(0.36,0.62),"boncapsule":(0.42,0.672),"bonthorax":(0.405,0.23),
"bongrowthplate":(0.42,0.655),
"musmuscle":(0.64,0.60),"musskeletal":(0.62,0.55),"mussmooth":(0.545,0.44),"muscardiac":(0.545,0.26),"musbiceps":(0.69,0.27),
"mustriceps":(0.705,0.29),"musdeltoid":(0.67,0.205),"muspectoral":(0.63,0.225),"musabs":(0.615,0.395),"musoblique":(0.63,0.43),
"musback":(0.645,0.33),"mustrapezius":(0.585,0.16),"musgluteus":(0.63,0.475),"musquad":(0.58,0.58),"mushamstring":(0.645,0.62),
"muscalf":(0.615,0.77),"mustibialis":(0.575,0.80),"musachilles":(0.585,0.875),"musdiaphragm":(0.455,0.29),"mustendon":(0.79,0.48),
"musflexor":(0.76,0.43),"musextensor":(0.735,0.40),"mussphincter":(0.515,0.51),"musvoluntary":(0.68,0.32),"musinvoluntary":(0.56,0.335),
"musfiber":(0.70,0.345),"muslat":(0.645,0.30),"musadductor":(0.54,0.585),
"orgesophagus":(0.515,0.192),"orgstomach":(0.555,0.313),"orgsmallint":(0.495,0.427),"orglargeint":(0.413,0.42),"orgduodenum":(0.465,0.353),
"orgliver":(0.435,0.313),"orggallbladder":(0.438,0.335),"orgpancreas":(0.502,0.349),"orgrectum":(0.52,0.472),"organus":(0.505,0.52),
"orgappendix":(0.422,0.459),"orgtrachea":(0.497,0.172),"orgbronchus":(0.483,0.21),"orglung":(0.441,0.244),"orgalveolus":(0.585,0.25),
"orgheart":(0.523,0.262),"orgartery":(0.47,0.15),"orgvein":(0.457,0.16),"orgcapillary":(0.45,0.232),"orgvessel":(0.465,0.175),
"orgaorta":(0.511,0.221),"orgatrium":(0.502,0.252),"orgventricle":(0.532,0.275),"orglymphvessel":(0.66,0.35),"orglymphnode":(0.66,0.245),
"orgspleen":(0.587,0.329),"orgkidney":(0.425,0.358),"orgbladder":(0.502,0.484),"orgureter":(0.462,0.468),"orgurethra":(0.505,0.505),
"orgnephron":(0.569,0.358),"orgskin":(0.36,0.60),"orgsweatgland":(0.37,0.66),"orguterus":(0.51,0.49),"orgovary":(0.465,0.478),
"orgtestis":(0.505,0.53),"orgspinalcord":(0.505,0.165),"orgnerve":(0.72,0.37),"orgperipheral":(0.31,0.32),"orgmotornerve":(0.62,0.68),
"orgsensorynerve":(0.84,0.54),"orgautonomic":(0.52,0.29),"orgthyroid":(0.50,0.155),"orgadrenal":(0.431,0.341),
"sysbreathing":(0.44,0.225),"sysoxygen":(0.60,0.235),"sysco2":(0.58,0.265),"sysgasexchange":(0.605,0.275),"sysdigestion":(0.47,0.44),
"sysabsorption":(0.52,0.44),"sysjuice":(0.48,0.335),"sysgastric":(0.575,0.31),"sysbile":(0.44,0.325),"syspancjuice":(0.515,0.355),
"sysenzyme":(0.49,0.335),"syspepsin":(0.58,0.325),"syslipase":(0.52,0.36),"sysvilli":(0.495,0.415),"sysperistalsis":(0.575,0.42),
"sysexcretion":(0.46,0.485),"sysurine":(0.50,0.472),"sysurea":(0.445,0.31),"sysammonia":(0.415,0.32),
"syspulse":(0.785,0.48),"sysheartbeat":(0.54,0.24),"syspulmonary":(0.575,0.235),
"sysinsulin":(0.50,0.35),"syslangerhans":(0.52,0.345),"sysglucagon":(0.48,0.35),"sysbloodsugar":(0.53,0.355),
"sysadrenaline":(0.58,0.345),"systhyroxine":(0.49,0.155),"syssexhormone":(0.51,0.535),
"syskneejerk":(0.59,0.68),"sysfracture":(0.43,0.85),"syssprain":(0.59,0.90),"sysstrain":(0.60,0.62),
# ── 頭(横から。顔は 向かって左) ──
"boncheek":(0.30,0.42),"bonnasal":(0.15,0.385),"bonhyoid":(0.40,0.71),"bonossicle":(0.68,0.48),
"musmasseter":(0.44,0.56),"musface":(0.15,0.52),
"orgmouth":(0.12,0.585),"orgteeth":(0.22,0.565),"orgtongue":(0.29,0.62),"orgsalivary":(0.33,0.705),"orgpharynx":(0.545,0.62),
"orgnose":(0.08,0.46),"orgnasal":(0.24,0.44),"orglarynx":(0.49,0.755),"orgeye":(0.27,0.35),"orgear":(0.87,0.50),
"orgretina":(0.335,0.35),"orglens":(0.235,0.33),"orgcornea":(0.195,0.345),"orgiris":(0.21,0.31),"orgpupil":(0.205,0.335),
"orgopticnerve":(0.40,0.34),"orgeardrum":(0.655,0.49),"orgcochlea":(0.745,0.495),"orgsemicircular":(0.705,0.44),
"orgtastebud":(0.25,0.605),"orgeyelid":(0.21,0.28),"orgolfactory":(0.215,0.412),
"orgbrain":(0.50,0.12),"orgcerebrum":(0.75,0.20),"orgcerebellum":(0.70,0.34),"orgbrainstem":(0.60,0.36),"orgdiencephalon":(0.57,0.28),
"orghypothalamus":(0.515,0.29),"orgpituitary":(0.502,0.325),"orgmedulla":(0.615,0.43),
"syscilia":(0.22,0.46),"syscough":(0.50,0.80),"syssneeze":(0.10,0.47),"sysvocalcord":(0.49,0.775),"syssaliva":(0.27,0.66),
"sysamylase":(0.32,0.66),"syscold":(0.555,0.66),"sysflu":(0.20,0.50),"syshayfever":(0.17,0.452),"sysgrowthhormone":(0.475,0.335),
"syscns":(0.45,0.15),"syssensation":(0.36,0.20),"syssynapse":(0.62,0.13),"syssleep":(0.40,0.10),"syscircadian":(0.54,0.25),
"syscavity":(0.26,0.555),
# ── 細胞(向かって左 = 動物の細胞 / 右 = 植物の細胞 / 下 = 染色体から DNA)。場所の無い 言葉は まわりの 白いところ ──
"celcell":(0.26,0.12),"celnucleus":(0.263,0.335),"celmembrane":(0.025,0.40),"celcytoplasm":(0.07,0.53),"celmitochondria":(0.355,0.148),
"celvacuole":(0.75,0.46),"celchloroplast":(0.595,0.30),"celcellwall":(0.525,0.40),"celribosome":(0.33,0.435),"celer":(0.145,0.30),
"celgolgi":(0.31,0.54),"celcentrosome":(0.115,0.445),"celnuclearmembrane":(0.35,0.28),"celnucleolus":(0.295,0.31),"celchromosome":(0.10,0.78),
"celdna":(0.80,0.80),"celgene":(0.92,0.80),"celbase":(0.745,0.82),"celhelix":(0.86,0.75),"celbasepair":(0.955,0.83),
"celmitosis":(0.07,0.70),"celmeiosis":(0.16,0.70),"celgenome":(0.33,0.76),"celheredity":(0.50,0.80),"celdominant":(0.62,0.82),
"celrecessive":(0.68,0.79),"celmutation":(0.88,0.86),"celatp":(0.075,0.30),"celrespiration":(0.455,0.43),"celenzyme":(0.30,0.20),
"celaminoacid":(0.40,0.30),"celcatalyst":(0.43,0.36),"celdiffusion":(0.49,0.30),"celosmosis":(0.556,0.55),
"celunicellular":(0.03,0.07),"celmulticellular":(0.10,0.07),"celtissue":(0.44,0.065),"celorgan":(0.50,0.065),
"celsexual":(0.60,0.695),"celasexual":(0.70,0.695),"celclone":(0.80,0.695),"celneuron":(0.90,0.695),
"celgamete":(0.26,0.67),"celbloodtype":(0.34,0.67),"celallele":(0.42,0.67),
"celfertilization":(0.26,0.965),"celzygote":(0.34,0.965),"celovum":(0.42,0.965),"celsperm":(0.50,0.965),"celips":(0.58,0.965),
"celes":(0.66,0.965),"celstemcell":(0.74,0.965),"celrna":(0.82,0.965),"celmendel":(0.90,0.965),"celsegregation":(0.97,0.965),
}
tsv = Path(__file__).resolve().parent / "body.tsv"
out, n = [], 0
for line in tsv.read_text(encoding="utf-8").splitlines():
    f = line.split("\t")
    if len(f) == 11 and f[0] in P:
        f[7], f[8] = "%.3f" % P[f[0]][0], "%.3f" % P[f[0]][1]; n += 1
    out.append("\t".join(f))
tsv.write_text("\n".join(out) + "\n", encoding="utf-8")
print("書きかえ", n)
